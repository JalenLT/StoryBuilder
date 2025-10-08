import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import { usePage } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"

import { Tag, Genre, Story } from "@/types"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Page() {
    const { stories } = usePage<{stories: Story[]}>().props;

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
                                        <TableHead>Name</TableHead>
                                        <TableHead>Tags</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stories.map((story: Story) => (
                                    <TableRow key={"story_" + story.id}>
                                        <TableCell className="font-medium max-w-70">
                                            <div className="flex items-center gap-5">
                                                {story.genres.length > 1 && <span className="fa-stack">
                                                    <FontAwesomeIcon icon={["fas", story.genres[0].image]} className="text-blue-900 fa-lg" transform="up-6 left-4" />
                                                    <FontAwesomeIcon icon={["fas", story.genres[1].image]} className="text-blue-900 fa-lg" transform="down-6 left-4" />
                                                </span>}
                                                <div>
                                                    <p className="leading-7 font-semibold">{story.title}</p>
                                                    <p className="text-sm text-muted-foreground text-wrap clamp-2">{story.description}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {story.tags.map((tag: Tag) => (
                                                <Badge key={"genre_" + tag.id} className="bg-blue-50 text-blue-700 mr-1 mb-1" variant="outline">
                                                    <FontAwesomeIcon icon={["fas", tag.image]} />
                                                    {tag.name}
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
