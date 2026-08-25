import { useState } from 'react';
import { Heart, Download, Share2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Wallpaper {
  id: number;
  title: string;
  category: string;
  image: string;
  color: string;
  liked: boolean;
  downloads: number;
}

const wallpapers: Wallpaper[] = [
  {
    id: 1,
    title: 'Neon Dreams',
    category: 'Abstract',
    image: 'https://images.unsplash.com/photo-1557672172-298e090d0f80?w=600&h=1200&fit=crop',
    color: 'from-purple-600 to-pink-600',
    liked: false,
    downloads: 2540,
  },
  {
    id: 2,
    title: 'Ocean Waves',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=1200&fit=crop',
    color: 'from-blue-500 to-cyan-400',
    liked: false,
    downloads: 3120,
  },
  {
    id: 3,
    title: 'Mountain Peak',
    category: 'Landscape',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=1200&fit=crop',
    color: 'from-slate-700 to-slate-900',
    liked: false,
    downloads: 1890,
  },
  {
    id: 4,
    title: 'Sunset Glow',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=600&h=1200&fit=crop',
    color: 'from-orange-500 to-red-600',
    liked: false,
    downloads: 4210,
  },
  {
    id: 5,
    title: 'Forest Green',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=1200&fit=crop',
    color: 'from-green-600 to-emerald-700',
    liked: false,
    downloads: 2780,
  },
  {
    id: 6,
    title: 'City Lights',
    category: 'Urban',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=1200&fit=crop',
    color: 'from-gray-800 to-gray-900',
    liked: false,
    downloads: 3450,
  },
];

const categories = ['All', 'Abstract', 'Nature', 'Landscape', 'Urban', 'Minimalist'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wallpaperList, setWallpaperList] = useState(wallpapers);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(wallpapers[0]);

  const filteredWallpapers = wallpaperList.filter((wp) => {
    const matchesCategory = selectedCategory === 'All' || wp.category === selectedCategory;
    const matchesSearch = wp.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id: number) => {
    setWallpaperList((prev) =>
      prev.map((wp) => (wp.id === id ? { ...wp, liked: !wp.liked } : wp))
    );
  };

  const handleDownload = (title: string) => {
    alert(`Downloading: ${title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Wallpapers</h1>
            </div>
            <p className="text-sm text-muted-foreground">Premium Mobile Wallpapers</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-2">
            {selectedWallpaper && (
              <div className="space-y-6">
                {/* Phone Preview */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-[600px] bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>
                    {/* Screen Content */}
                    <img
                      src={selectedWallpaper.image}
                      alt={selectedWallpaper.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                      <h2 className="text-white text-xl font-bold">{selectedWallpaper.title}</h2>
                      <p className="text-white/80 text-sm">{selectedWallpaper.category}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                    onClick={() => handleDownload(selectedWallpaper.title)}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleLike(selectedWallpaper.id)}
                    className={selectedWallpaper.liked ? 'bg-red-50 border-red-200' : ''}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${selectedWallpaper.liked ? 'fill-red-500 text-red-500' : ''}`}
                    />
                    {selectedWallpaper.liked ? 'Liked' : 'Like'}
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200">
                    <p className="text-2xl font-bold text-foreground">
                      {selectedWallpaper.downloads.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Downloads</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200">
                    <p className="text-2xl font-bold text-foreground">4.8</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200">
                    <p className="text-2xl font-bold text-foreground">HD</p>
                    <p className="text-xs text-muted-foreground">Quality</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Gallery & Search */}
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search wallpapers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200"
              />
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'
                        : 'border-slate-200'
                    }
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Wallpaper Grid */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Gallery</p>
              <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredWallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => setSelectedWallpaper(wp)}
                    className={`relative group rounded-lg overflow-hidden h-32 transition-all ${
                      selectedWallpaper?.id === wp.id ? 'ring-2 ring-purple-600 scale-105' : ''
                    }`}
                  >
                    <img
                      src={wp.image}
                      alt={wp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <p className="text-white text-xs font-semibold truncate">{wp.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Badge */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
              <p className="text-sm font-semibold mb-1">✨ Featured Collection</p>
              <p className="text-xs opacity-90">Curated premium wallpapers updated daily</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-semibold text-foreground mb-3">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Browse</a></li>
                <li><a href="#" className="hover:text-foreground transition">Collections</a></li>
                <li><a href="#" className="hover:text-foreground transition">Trending</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-3">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-3">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">License</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-3">Follow</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Wallpapers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
