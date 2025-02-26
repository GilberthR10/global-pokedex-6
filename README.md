

## Enfoque y visión general

Al enfrentarme a este proyecto, mi objetivo principal fue crear una aplicación que no solo fuera visualmente atractiva, sino también técnicamente robusta y escalable. Aunque la aplicación puede parecer sencilla a primera vista, implementé soluciones pensando en el manejo de grandes volúmenes de datos.

## Arquitectura y organización
```mermaid
flowchart TD
    API[PokeApi] --> |GET| PokemonService
    PokemonService --> |Query| VueQuery
    VueQuery --> |Cached Data| UsePokemon[usePokemon Composable]
    UsePokemon --> |Pokemon Data| Store[Pinia Store]
    UsePokemon --> |Pokemon Data| UI[UI Components]
    Store --> |Favorites| UI
```

Opté por una arquitectura modular con una clara separación de responsabilidades:

- **Composables personalizados**: Creé `usePokemon.ts` para encapsular toda la lógica relacionada con los Pokémon, separando la UI de la lógica de negocio. Esto facilitaría la mantenibilidad y testabilidad del código.

- **Pinia para el estado global**: Utilicé Pinia en lugar de Vuex por su mejor integración con TypeScript y una API más moderna. El store mantiene y persiste la lista de Pokémon favoritos, permitiendo un acceso consistente desde cualquier componente.

## Rendimiento con grandes volúmenes de datos

Para manejar eficientemente grandes cantidades de datos, implementé:

- **Lista virtualizada**: Utilicé `useVirtualList` de VueUse, que renderiza únicamente los elementos visibles en pantalla. Esto es crucial cuando se trabaja con listas extensas, como los potenciales 1000+ Pokémon, ya que evita la sobrecarga del DOM y mantiene la aplicación fluida.
## Lista virtualizada
## Lista virtualizada

![Alt text](/src/assets/VirtualList.gif)
```mermaid
graph TB
    subgraph AllPokemon["Todos los Pokémon (1000+)"]
        A[Pokémon #1]
        B[Pokémon #2]
        C[...]
        D[Pokémon #1000+]
    end
    
    subgraph VisibleArea["Área Visible en Pantalla"]
        E[Pokémon Visible #1]
        F[Pokémon Visible #2]
        G[...]
        H[Pokémon Visible #10]
    end
    
    AllPokemon -->|useVirtualList| VisibleArea
    
    style AllPokemon opacity:0.5
    style VisibleArea fill:#f9f,stroke:#333,stroke-width:2px
```
## Scroll infinito
- **Scroll infinito**: Implementé `useInfiniteScroll` para cargar datos adicionales a medida que el usuario se acerca al final de la lista. En lugar de cargar todos los Pokémon de una vez (lo que sería ineficiente), estos se cargan por lotes, mejorando significativamente los tiempos de carga inicial.
## TanStack Query
- **TanStack Query (Vue Query)**: Para gestionar las peticiones a la API de forma eficiente, con funcionalidades como caché, reintento de peticiones fallidas y estados de carga/error.
```mermaid
sequenceDiagram
    User->>UI: Scroll hacia abajo
    UI->>useInfiniteScroll: Detecta proximidad al final
    useInfiniteScroll->>VueQuery: fetchNextPage()
    VueQuery->>PokéAPI: Solicita siguiente lote
    PokéAPI->>VueQuery: Devuelve nuevos Pokémon
    VueQuery->>Pinia Store: Actualiza lista
    Pinia Store->>UI: Renderiza nuevos elementos
```

## Estructura de componentes
```mermaid
flowchart TD
    App --> PokemonsListView
    PokemonsListView --> PokemonSearch
    PokemonsListView --> PokemonsList
    PokemonsListView --> TheFooter
    PokemonsList --> PokemonListItem
    PokemonListItem --> PokemonDetail
    PokemonDetail --> BaseCircleButton
    
    subgraph Composables
        usePokemon
        useClipboard
    end
    
    subgraph Store
        PokemonStore[Pokemon Store]
    end
    
    PokemonsList -.-> usePokemon
    PokemonSearch -.-> usePokemon
    PokemonDetail -.-> useClipboard
    usePokemon -.-> PokemonStore
```
## Optimizaciones de UX

- **Debounce en búsquedas**: Implementé un debounce en el campo de búsqueda para evitar múltiples llamadas a la API mientras el usuario está escribiendo.

- **Toast notifications**: Para confirmar acciones como agregar a favoritos o compartir información.

- **Modal detallado**: Para mostrar información detallada de cada Pokémon sin perder el contexto de la lista.

## Herramientas y utilidades

- **VueUse**: Esta librería fue fundamental por sus composables reutilizables que aceleraron el desarrollo. Además de `useVirtualList` y `useInfiniteScroll`, utilicé `useClipboard` para la funcionalidad de compartir y `useDebounceFn` para la búsqueda.

- **TypeScript**: Implementé interfaces claras para los datos, lo que facilita el mantenimiento y previene errores.

## Testing

Agregué una suite de tests unitarios con Vitest para validar el funcionamiento correcto de componentes clave y la lógica del negocio.

## Reflexión

Aunque la aplicación podría haberse implementado de forma más sencilla, elegí un enfoque más robusto pensando en la escalabilidad. Las decisiones técnicas fueron tomadas considerando:

1. La posibilidad de expansión (más Pokémon, más funcionalidades)
2. El rendimiento con grandes volúmenes de datos
3. La experiencia de usuario
4. La mantenibilidad del código

Esta arquitectura asegura que la aplicación funcione de manera fluida incluso si la base de datos crece significativamente, manteniendo tiempos de carga rápidos y una experiencia de usuario óptima.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

