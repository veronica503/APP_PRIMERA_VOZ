import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { AREA_LIST, startingLevelForGrade } from "@/lib/curriculum";

// Carga el perfil del estudiante del usuario actual y su progreso por área.
export function useStudent() {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!user?.id) return;
    try {
      const items = await base44.entities.StudentProfile.filter({ created_by_id: user.id });
      setProfile(items[0] || null);
      return items[0] || null;
    } catch (e) {
      setProfile(null);
      return null;
    }
  }, [user?.id]);

  const loadProgress = useCallback(async (profileId) => {
    if (!profileId) {
      setProgress({});
      return {};
    }
    try {
      const records = await base44.entities.Progress.filter({ student_profile_id: profileId });
      const map = {};
      for (const area of AREA_LIST) {
        const rec = records.find((r) => r.area === area);
        if (rec) map[area] = rec;
      }
      setProgress(map);
      return map;
    } catch (e) {
      setProgress({});
      return {};
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      const p = await loadProfile();
      await loadProgress(p?.id);
      setLoading(false);
    })();
  }, [isAuthenticated, user?.id, loadProfile, loadProgress]);

  const ensureProgress = useCallback(
    async (area) => {
      if (!profile?.id) return null;
      let rec = progress[area];
      if (rec) return rec;
      try {
        rec = await base44.entities.Progress.create({
          student_profile_id: profile.id,
          area,
          current_level: startingLevelForGrade(profile.grade) || 1,
          current_activity: 0,
          completed_activities_total: 0,
        });
        setProgress((prev) => ({ ...prev, [area]: rec }));
        return rec;
      } catch (e) {
        return null;
      }
    },
    [profile?.id, progress]
  );

  const advanceActivity = useCallback(
    async (area) => {
      const rec = progress[area];
      if (!rec) return;
      const nextActivity = rec.current_activity + 1;
      const { ACTIVITIES_PER_LEVEL } = await import("@/lib/curriculum");
      let nextLevel = rec.current_level;
      let resetActivity = nextActivity;
      if (nextActivity >= ACTIVITIES_PER_LEVEL) {
        nextLevel = Math.min(20, rec.current_level + 1);
        resetActivity = 0;
      }
      const updated = await base44.entities.Progress.update(rec.id, {
        current_activity: resetActivity,
        current_level: nextLevel,
        completed_activities_total: rec.completed_activities_total + 1,
      });
      setProgress((prev) => ({ ...prev, [area]: updated }));
      return updated;
    },
    [progress]
  );

  return { profile, progress, loading, loadProfile, loadProgress, ensureProgress, advanceActivity, setProgress };
}