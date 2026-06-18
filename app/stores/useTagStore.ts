import {create} from 'zustand';
import {getListTagFollowed} from '@/app/api/tagApi';
import { IFTag } from "@/app/interfaces/tag";
import { getAccessToken } from '@/app/utils/tokenStorage';

interface TagStore {
  tags: IFTag[];
  loading: boolean;
  followedTags: number[];
  setTags: (tags: IFTag[]) => void;
  setLoading: (loading: boolean) => void;
  getListTagFollowed: () => Promise<void>;
  toggleFollowTag: (tagId: number) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  loading: false,
  followedTags: [],
  setTags: (tags) => set({tags}),
  setLoading: (loading) => set({loading}),
  getListTagFollowed: async () => {
    // Followed tags is a protected endpoint. Skip the call entirely when the
    // user isn't logged in so we don't spam the console with auth errors on
    // every anonymous page load.
    if (!getAccessToken()) {
      set({tags: [], loading: false});
      return;
    }
    try {
      set({loading: true});
      const {data, error} = await getListTagFollowed();
      if (error) throw error;
      set({tags: data?.data || []});
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      set({loading: false});
    }
  },
  toggleFollowTag: (tagId: number) => {
    set((state) => {
      const isFollowed = state.followedTags.includes(tagId);
      return {
        followedTags: isFollowed
          ? state.followedTags.filter((id) => id !== tagId)
          : [...state.followedTags, tagId],
      };
    });
  },
}));
