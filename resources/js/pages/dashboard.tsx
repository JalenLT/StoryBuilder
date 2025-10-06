import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import { usePage } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Page() {
    const { stories } = usePage().props;
    console.log(stories)
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader name="Dashboard" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main gap-2">
                        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance px-4 md:px-6 pb-0 pt-4 md:pt-6">
                            Templates
                        </h1>
                        <div className="flex gap-4 px-4 md:gap-6 md:px-6 pt-3">
                            <div className="basis-[12.5%]">
                                <Card className="overflow-hidden py-0">
                                    <CardContent className="flex items-center justify-center aspect-3/2">
                                        <Plus />
                                    </CardContent>
                                </Card>
                                <div className="text-sm text-muted-foreground text-center leading-none font-semibold pt-1">
                                    Blank Story
                                </div>
                            </div>
                            <div className="basis-[12.5%]">
                                <Card className="overflow-hidden py-0">
                                    <img
                                        src="/pictures/flowchart.png"
                                        alt="flowchart"
                                        className="aspect-3/2 object-cover"
                                    />
                                </Card>
                                <div className="text-sm text-muted-foreground text-center leading-none font-semibold pt-1">
                                    Flowchart
                                </div>
                            </div>
                            <div className="basis-[12.5%]">
                                <Card className="overflow-hidden py-0">
                                    <img
                                        src="/pictures/flowchart.png"
                                        alt="flowchart"
                                        className="aspect-3/2 object-cover"
                                    />
                                </Card>
                                <div className="text-sm text-muted-foreground text-center leading-none font-semibold pt-1">
                                    Flowchart
                                </div>
                            </div>
                            <div className="basis-[12.5%]">
                                <Card className="overflow-hidden py-0">
                                    <img
                                        src="/pictures/flowchart.png"
                                        alt="flowchart"
                                        className="aspect-3/2 object-cover"
                                    />
                                </Card>
                                <div className="text-sm text-muted-foreground text-center leading-none font-semibold pt-1">
                                    Flowchart
                                </div>
                            </div>
                            <div className="basis-[12.5%]">
                                <Card className="overflow-hidden py-0">
                                    <img
                                        src="/pictures/flowchart.png"
                                        alt="flowchart"
                                        className="aspect-3/2 object-cover"
                                    />
                                </Card>
                                <div className="text-sm text-muted-foreground text-center leading-none font-semibold pt-1">
                                    Flowchart
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="@container/main gap-2">
                        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance px-4 md:px-6 pb-0 pt-4 md:pt-6">
                            Stories
                        </h1>
                        <div className="px-4 md:px-6 pt-3">
                            <Table>
                                <TableCaption>A list of your stories.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Genres</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stories.data.map((story) => (
                                    <TableRow key={story.id}>
                                        <TableCell className="font-medium">{story.title}</TableCell>
                                        <TableCell>{story.description}</TableCell>
                                        <TableCell>
                                            {story.genres.map((genre) => (
                                                <Badge key={genre} className="mr-1 mb-1" variant="outline">
                                                    {genre}
                                                </Badge>
                                            ))}
                                        </TableCell>
                                        <TableCell>{story.updated_at}</TableCell>
                                        <TableCell>Actions here</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
