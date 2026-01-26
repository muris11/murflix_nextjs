# Implementation Plan: Sansekai API Integration for Murflix

This plan outlines the steps to fully integrate the Sansekai API (DramaBox, ReelShort, NetShort, Anime, etc.) into the Murflix application.

## Phase 1: Core Integration (Completed)
- [x] **Type Definitions**: Created `types/sansekai.ts` with interfaces for all API responses.
- [x] **API Client**: Created `lib/sansekai.ts` with methods for all endpoints (DramaBox, ReelShort, NetShort, Melolo, FlickReels, FreeReels, Anime, Komik, MovieBox).
- [x] **Error Handling**: Implemented basic error handling in the fetch wrapper.

## Phase 2: Component Development (Next Steps)
Create reusable UI components to display content from different providers.

### 2.1 Media Cards
- `components/media/DramaCard.tsx`: For DramaBox, ReelShort, etc. (Portrait style)
- `components/media/AnimeCard.tsx`: Specific layout for Anime items.
- `components/media/KomikCard.tsx`: For Comic/Manga items.

### 2.2 Section Containers
- `components/home/ProviderSection.tsx`: Horizontal scroll container for a specific provider (e.g., "Popular on DramaBox").

## Phase 3: Page Implementation (Routes)
Implement App Router pages for each service.

### 3.1 DramaBox (`/dramabox`)
- `app/dramabox/page.tsx`: Dashboard showing Trending, Latest, and For You.
- `app/dramabox/[id]/page.tsx`: Detail page with episode list.
- `app/dramabox/watch/[id]/[episode]/page.tsx`: Video player for episodes.

### 3.2 ReelShort (`/reelshort`)
- `app/reelshort/page.tsx`: Homepage for ReelShort content.
- `app/reelshort/[id]/page.tsx`: Detail view.

### 3.3 Anime (`/anime`)
- `app/anime/page.tsx`: Anime dashboard.
- `app/anime/[slug]/page.tsx`: Anime details and episode list.

### 3.4 Search Integration
- Update `components/navbar/Search.tsx` or create `app/search/page.tsx` to support multi-provider search (aggregating results from Sansekai and TMDB).

## Phase 4: Features & Optimization
- **Video Player**: Implement a robust video player component (using HLS.js or native video tag depending on stream format).
- **Caching**: Ensure `next: { revalidate: 3600 }` is working correctly for ISR.
- **Loading States**: Create Skeleton loaders for cards and details.

## Phase 5: Testing & Validation
- Verify API responses against types.
- Test error states (API down, invalid IDs).
- Verify mobile responsiveness for new layouts.
