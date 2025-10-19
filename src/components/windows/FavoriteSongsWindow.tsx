import { Frame } from "@react95/core";

const FavoriteSongsWindow = () => (
    <div className="flex h-full flex-col gap-4 py-1 text-slate-800 overflow-auto">

        <Frame boxShadow="$in" className="flex flex-1 items-center justify-center bg-[#c3c7cb] py-3">
            <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" height="450"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.music.apple.com/fi/playlist/favorite-songs/pl.u-zpU8axY04"></iframe>
        </Frame>
    </div>
);

export default FavoriteSongsWindow;
