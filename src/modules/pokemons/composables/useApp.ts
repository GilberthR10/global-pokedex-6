import { ref, computed, type Component } from 'vue';
import WelcomeView from '../views/WelcomeView.vue';
import PokemonsListView from '../views/PokemonsListView.vue';
import LoadingView from '../views/LoadingView.vue';

export enum ViewType {
  WELCOME = 'WELCOME',
  POKEMONS_LIST = 'POKEMONS_LIST',
  LOADING = 'LOADING',
}

const viewComponents: Record<ViewType, Component> = {
  [ViewType.WELCOME]: WelcomeView,
  [ViewType.POKEMONS_LIST]: PokemonsListView,
  [ViewType.LOADING]: LoadingView,
};


const currentViewType = ref<ViewType>(ViewType.WELCOME);

export const useApp = () => {
  const currentComponent = computed(() => {
    return viewComponents[currentViewType.value];
  });


  const setCurrentView = (viewType: ViewType) => {
    currentViewType.value = viewType;
  };

  return {
    currentViewType: computed(() => currentViewType.value),
    currentComponent,
    setCurrentView
  };
};
