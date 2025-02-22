import { createContext, useContext, useEffect, useState } from "react";

interface Profile {
  name: string;
  age: number;
  stats: Record<string, LevelStats[]>
}

type LevelStats = {
  score: number;
  timeElapsed: number;
  nextUnlocked?: boolean
}[];

const ProfileContext = createContext<{
  profile: Profile | null,
  fetchProfile: () => void,
  addScore: (levelId: number, score: number, timeElapsed: number) => void,
  updateProfile: (data: Omit<Profile, 'stats'>) => void
} | undefined>(undefined)

export const useProfile = () => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }

  return context
}

export const ProfileProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = () => {
    const data = localStorage.getItem("profile")
    if (data) setProfile(JSON.parse(data))
  }

  const updateProfile = (prof: Omit<Profile, 'stats'>) => {
    localStorage.setItem("profile", JSON.stringify({
      stats: profile?.stats || [],
      ...prof,
    } as Profile))
  }

  const addScore = (id: number, score: number, timeElapsed: number) => {
    if (!profile) return

    if (profile.stats[id] === undefined) {
      profile.stats[id] = []
    }

    profile.stats[id] = profile.stats[id].concat([{ score, timeElapsed }])

    localStorage.setItem("profile", JSON.stringify(profile))
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <ProfileContext.Provider value={{
      profile,
      addScore,
      fetchProfile,
      updateProfile
    }}>
      {children}
    </ProfileContext.Provider>
  )
};