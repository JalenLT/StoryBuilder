import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import { usePage } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";

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
                <div className="flex flex-1 flex-col dotted-background">
                    <div className="@container/main gap-2">
                        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance px-4 md:px-6 pb-0 pt-2 md:pt-4 text-blue-900">
                            Templates
                        </h1>
                        <Card className="m-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-stone-50/10 backdrop-blur-sm border-slate-300/50
                        transform-gpu will-change-transform
                        transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
                        hover:-translate-y-[2px]
                        ">
                            <CardContent>
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
                            </CardContent>
                        </Card>
                    </div>
                    <div className="@container/main gap-2">
                        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance px-4 md:px-6 pb-0 pt-2 md:pt-3 text-blue-900">
                            Stories
                        </h1>
                        <Card className="m-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-stone-50/10 backdrop-blur-md border-slate-300/50
                        transform-gpu will-change-transform
                        transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
                        hover:-translate-y-[2px]
                        ">
                            <CardContent>
                                <TooltipProvider>
                                    <Table>
                                        <TableCaption>A list of your stories.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-slate-600 uppercase text-xs tracking-wide">Name</TableHead>
                                                <TableHead className="text-slate-600 uppercase text-xs tracking-wide">Tags</TableHead>
                                                <TableHead className="text-slate-600 uppercase text-xs tracking-wide">Last Updated</TableHead>
                                                <TableHead className="text-slate-600 uppercase text-xs tracking-wide">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {stories.map((story: Story) => (
                                            <TableRow key={"story_" + story.id}>
                                                <TableCell className="font-medium max-w-70">
                                                    <div className="flex items-center gap-5">
                                                        {story.genres.length > 1 && <span className="fa-stack">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <FontAwesomeIcon icon={["fas", story.genres[0].image]} className="text-blue-900 fa-lg" transform="up-6 left-4" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    {story.genres[0].name}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <FontAwesomeIcon icon={["fas", story.genres[1].image]} className="text-blue-900 fa-lg" transform="down-6 left-4" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    {story.genres[1].name}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </span>}
                                                        <div>
                                                            <p className="leading-7 font-semibold text-blue-900">{story.title}</p>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <p className="text-sm text-muted-foreground text-wrap clamp-2">{story.description}</p>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="max-w-lg">
                                                                    <p className="text-wrap">{story.description}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-wrap">
                                                    {story.tags.map((tag: Tag) => (
                                                        <Badge key={"genre_" + tag.id} className="bg-green-50 text-green-700 mr-1 mb-1" variant="outline">
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
                                </TooltipProvider>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
