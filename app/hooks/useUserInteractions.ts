import { IFInteraction } from "@/app/interfaces/interaction";
import { useUserStore } from "@/app/stores/useUserStore";

export const useUserInteractions = ({ interactions }: { interactions: IFInteraction[] }) => {
  const user = useUserStore((state) => state.user);

  if (!user) return {};

  return interactions
    .filter((interaction) => interaction?.user?.id === user.id)
    .reduce<Record<string, boolean>>((acc, interaction) => {
      acc[interaction.interaction_type] = true;
      return acc;
    }, {});
};

export const useInteractionCount = ({ interactions }: { interactions: IFInteraction[] }) => {
  const bookmarks = interactions.filter((i) => i.interaction_type === "bookmark").length;

  const reactions = interactions.reduce<Record<string, number>>((acc, interaction) => {
    if (interaction.interaction_type !== "bookmark") {
      acc[interaction.interaction_type] = (acc[interaction.interaction_type] || 0) + 1;
    }
    return acc;
  }, {});

  return { bookmarks, reactions };
};
