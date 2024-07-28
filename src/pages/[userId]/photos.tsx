import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Album, Photo } from "@/types/types";
import { getUserAlbums, getUserPhotos } from "@/api/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Image as ImageIcon, Menu } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Photos = () => {
  const { userId } = useParams<{ userId: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const userAlbums = await getUserAlbums(parseInt(userId));
        setAlbums(userAlbums);

        // Load the first album automatically
        if (userAlbums.length > 0) {
          await handlePhotos(userAlbums[0]);
        }

        setError(null);
      } catch (err) {
        setError("Failed to fetch user albums. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handlePhotos = async (album: Album) => {
    try {
      setIsLoadingPhotos(true);
      setSelectedAlbum(album);
      const userPhotos = await getUserPhotos(album.id);
      setPhotos(userPhotos);
      setError(null);
      setIsSheetOpen(false);
    } catch (err) {
      setError("Failed to fetch album photos. Please try again later.");
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-[300px] h-[20px] rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const AlbumList = () => (
    <ScrollArea className="h-[calc(100vh-200px)] pr-4">
      {albums.map((album) => (
        <Button
          key={album.id}
          variant={selectedAlbum?.id === album.id ? "secondary" : "ghost"}
          className="w-full justify-start mb-2 text-left"
          onClick={() => handlePhotos(album)}
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          <span className="truncate">{album.title}</span>
        </Button>
      ))}
    </ScrollArea>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile Album Selector */}
      <div className="md:hidden p-4">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" />
              {selectedAlbum ? selectedAlbum.title : "Select Album"}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Albums</SheetTitle>
              <SheetDescription>
                Select an album to view photos
              </SheetDescription>
            </SheetHeader>
            <AlbumList />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Album List */}
      <Card className="hidden md:block md:w-1/4 p-4 m-2 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Albums</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <AlbumList />
        </CardContent>
      </Card>

      {/* Photos Display */}
      <div className="flex-1 p-4 m-2 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {selectedAlbum ? selectedAlbum.title : "Select an Album"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingPhotos ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <Skeleton key={index} className="w-full h-40 rounded-md" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-40 object-cover rounded-md hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => window.open(photo.url, "_blank")}
                  />
                ))}
              </div>
            )}
            {selectedAlbum && photos.length === 0 && !isLoadingPhotos && (
              <p className="text-center text-gray-500">
                No photos found in this album
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Photos;
