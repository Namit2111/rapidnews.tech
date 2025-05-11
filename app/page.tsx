import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, Bell, TrendingUp, Clock, ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">RapidNews</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
              Politics
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
              Sports
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
              Entertainment
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
              Technology
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
              Business
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Breaking News Banner */}
        <div className="bg-red-600 text-white py-2">
          <div className="container flex items-center gap-2">
            <Badge variant="outline" className="bg-white text-red-600 border-white">
              BREAKING
            </Badge>
            <p className="text-sm font-medium">
              IPL 2025: Mumbai Indians secure dramatic last-over victory against Chennai Super Kings
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 overflow-hidden">
              <div className="relative h-[300px] md:h-[400px]">
                <Image src="/placeholder.svg?height=400&width=800" alt="Featured news" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <Badge className="w-fit mb-2 bg-red-600 hover:bg-red-700">Politics</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Government Announces Major Policy Reforms to Boost Economy
                  </h1>
                  <p className="text-white/80 text-sm md:text-base">
                    New economic measures aim to create jobs and stimulate growth across sectors
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <Clock className="h-4 w-4 text-white/60" />
                    <span className="text-white/60 text-sm">2 hours ago</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-4">
              <Card>
                <div className="relative h-[180px]">
                  <Image src="/placeholder.svg?height=180&width=400" alt="IPL news" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <Badge className="w-fit mb-2 bg-green-600 hover:bg-green-700">Sports</Badge>
                    <h2 className="text-lg font-bold text-white">IPL 2025: Top Performers of the Season So Far</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-3 w-3 text-white/60" />
                      <span className="text-white/60 text-xs">4 hours ago</span>
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="relative h-[180px]">
                  <Image
                    src="/placeholder.svg?height=180&width=400"
                    alt="Technology news"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <Badge className="w-fit mb-2 bg-purple-600 hover:bg-purple-700">Technology</Badge>
                    <h2 className="text-lg font-bold text-white">
                      New AI Breakthrough Could Transform Healthcare Industry
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-3 w-3 text-white/60" />
                      <span className="text-white/60 text-xs">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* News Categories Tabs */}
        <section className="container py-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-6 overflow-x-auto">
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="ipl">IPL 2025</TabsTrigger>
              <TabsTrigger value="politics">Politics</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <div className="relative h-[200px]">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&text=News ${item}`}
                        alt={`News ${item}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">
                        Latest developments in national politics shake the capital
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">8 hours ago</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Political analysts weigh in on the implications of recent policy changes and their potential
                        impact on upcoming elections.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="link" className="p-0 h-auto text-red-600" asChild>
                        <Link href="#" className="flex items-center">
                          Read more <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Load More News</Button>
              </div>
            </TabsContent>

            <TabsContent value="ipl" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <div className="relative h-[200px]">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&text=IPL ${item}`}
                        alt={`IPL News ${item}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">IPL 2025: Team standings after week three of tournament</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">5 hours ago</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Mumbai Indians and Chennai Super Kings lead the points table after impressive performances in
                        recent matches.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="link" className="p-0 h-auto text-green-600" asChild>
                        <Link href="#" className="flex items-center">
                          Read more <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Load More IPL News</Button>
              </div>
            </TabsContent>

            {/* Other tabs would have similar content structure */}
            <TabsContent value="politics">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Politics news content would appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="business">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Business news content would appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="tech">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Technology news content would appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="entertainment">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Entertainment news content would appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Trending Section */}
        <section className="bg-muted py-8">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Trending Now</h2>
              <Button variant="link" className="text-red-600" asChild>
                <Link href="#" className="flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="relative h-[150px]">
                    <Image
                      src={`/placeholder.svg?height=150&width=300&text=Trending ${item}`}
                      alt={`Trending ${item}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-600 hover:bg-red-700"># {item}</Badge>
                    </div>
                  </div>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">Stock markets reach all-time high amid economic optimism</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* IPL Special Section */}
        <section className="container py-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">IPL 2025 Special Coverage</h2>
            <Badge className="bg-green-600 hover:bg-green-700">LIVE</Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2">
              <div className="relative h-[300px]">
                <Image
                  src="/placeholder.svg?height=300&width=700&text=IPL Match"
                  alt="IPL match"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Mumbai Indians vs Chennai Super Kings: Match Highlights</CardTitle>
                <CardDescription>A thrilling encounter that went down to the last over</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mumbai Indians secured a dramatic victory against Chennai Super Kings in a match that showcased the
                  best of T20 cricket. With stellar performances from key players, the match was a treat for cricket
                  fans.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Top Scorer</h3>
                    <p>Rohit Sharma - 82 (48)</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Best Bowler</h3>
                    <p>Jasprit Bumrah - 3/24</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-green-600 hover:bg-green-700">Full Match Report</Button>
              </CardFooter>
            </Card>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">IPL 2025 Points Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["Mumbai Indians", "Chennai Super Kings", "Delhi Capitals", "Royal Challengers Bangalore"].map(
                      (team, index) => (
                        <div key={team} className="flex items-center justify-between p-2 border-b">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{index + 1}.</span>
                            <span>{team}</span>
                          </div>
                          <span className="font-medium">{12 - index * 2} pts</span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Complete Table
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { teams: "RCB vs KKR", time: "Today, 7:30 PM" },
                      { teams: "PBKS vs SRH", time: "Tomorrow, 3:30 PM" },
                      { teams: "GT vs RR", time: "May 13, 7:30 PM" },
                    ].map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border-b">
                        <span className="font-medium">{match.teams}</span>
                        <span className="text-sm text-muted-foreground">{match.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Full Schedule
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">RapidNews</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Your trusted source for the latest news and updates from around the world.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Politics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Entertainment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Advertise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Subscribe</h3>
              <p className="text-gray-400 text-sm mb-4">Get the latest news delivered to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-3 py-2 rounded text-sm flex-1"
                />
                <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} RapidNews. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
