"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useMediaStore } from "@/lib/stores/media";
import { FileData } from "@/types/file-data";
import MediaContent from "./media-content";

interface Props {
    files: FileData[];
}

export default function MediaDialog({ files }: Props) {
    const mediaStore = useMediaStore();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={mediaStore.isOpen} onOpenChange={mediaStore.close} modal defaultOpen={mediaStore.isOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Your Gallery</DialogTitle>
                        <DialogDescription>Select an image or upload a new one</DialogDescription>
                    </DialogHeader>

                    <div className="-me-3 pe-3 overflow-y-auto max-h-[calc(75vh-12rem)]">
                        <MediaContent files={files} />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={mediaStore.isOpen} onOpenChange={mediaStore.close} modal>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Your Gallery</DrawerTitle>
                    <DrawerDescription>Select an image or upload a new one</DrawerDescription>
                </DrawerHeader>

                <div className="-me-3 pe-3 overflow-y-auto max-h-[calc(75vh-12rem)]">
                    <MediaContent files={files} className="px-4" />
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
