import { useState } from 'react';
import SportCard from '../components/SportCard'; // Assume SportsCard is a similar component to ConcertCard
// Sample sports data for specified events
const SPORTS_EVENTS = [
    {
        id: '1',
        title: 'Football World Cup Final',
        description: 'Join us for the thrilling final match of the Football World Cup!',
        date: '2024-07-15',
        time: '18:00',
        venue: 'Luzhniki Stadium, Moscow',
        price: 200.00,
        location: 'Moscow',
        category: 'Football',
        imageUrl: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/a617/live/4c8ad930-65d9-11ed-a6af-4f332dcec329.jpg.webp',
    },
    {
        id: '2',
        title: 'NBA Finals Game 1',
        description: 'Watch the NBA Finals live in action!',
        date: '2024-06-01',
        time: '20:00',
        venue: 'Staples Center, Los Angeles',
        price: 150.00,
        location: 'Los Angeles',
        category: 'Basketball',
        imageUrl: 'https://i.ytimg.com/vi/P7g4WmHR41o/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgXihGMA8=&rs=AOn4CLAvv_DjBVsfuFvmMRz2mc1EKbZIkg',
    },
    {
        id: '3',
        title: 'Wimbledon Championship',
        description: 'Experience the elegance of tennis at Wimbledon.',
        date: '2024-07-01',
        time: '14:00',
        venue: 'All England Club, London',
        price: 300.00,
        location: 'London',
        category: 'Tennis',
        imageUrl: 'https://www.usatoday.com/gcdn/authoring/authoring-images/2024/07/12/USAT/74387088007-usp-tennis-wimbledon.jpg?crop=5814,3272,x0,y392&width=660&height=371&format=pjpg&auto=webp',
    },
    {
        id: '4',
        title: 'Super Bowl LVIII',
        description: 'Don’t miss the biggest game in American football!',
        date: '2024-02-11',
        time: '18:30',
        venue: 'Allegiant Stadium, Las Vegas',
        price: 500.00,
        location: 'Las Vegas',
        category: 'American Football',
        imageUrl: 'https://gray-wgcl-prod.gtv-cdn.com/resizer/v2/2VNZ73E7VRD3TLTURVPEQOLXQ4.png?auth=f7b9eab664a3575e012163aedabc22a3456626f6f5901ecc3070e04a741ec442&width=800&height=450&smart=true',
    },
    {
        id: '5',
        title: 'UFC 300: Title Fight',
        description: 'Witness history at UFC 300 with a title fight!',
        date: '2024-05-25',
        time: '22:00',
        venue: 'T-Mobile Arena, Las Vegas',
        price: 250.00,
        location: 'Las Vegas',
        category: 'Mixed Martial Arts',
        imageUrl: 'https://staticg.sportskeeda.com/editor/2024/04/2d71d-17125715828567-1920.jpg?w=640',
    },
    {
        id: '6',
        title: 'WWE WrestleMania 41',
        description: 'Experience the grandest stage of them all at WrestleMania 40!',
        date: '2024-04-07',
        time: '19:00',
        venue: 'MetLife Stadium, New Jersey',
        price: 300.00,
        location: 'New Jersey',
        category: 'Wrestling',
        imageUrl: 'https://lastwordonsports.com/prowrestling/wp-content/uploads/sites/15/2025/02/GiAIhWiX0AAFDhN-e1738914949306.jpeg',
    },
    {
        id: '7',
        title: 'India vs Pakistan Cricket Match',
        description: 'Catch the thrilling rivalry in cricket between India and Pakistan!',
        date: '2024-10-14',
        time: '14:00',
        venue: 'Dubai International Stadium',
        price: 180.00,
        location: 'Dubai',
        category: 'Cricket',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7rrgnlj-mHkzMd8YEBx9FgWNuaRQr8IC_OvQ5nzpcvYXllxmyhGmmdrjo8jidRG8u-u4&usqp=CAU',
    },
    {
        id: '8',
        title: 'RCB vs CSK Match',
        description: 'Don’t miss the epic clash between RCB and CSK in IPL!',
        date: '2024-05-10',
        time: '20:00',
        venue: 'M. Chinnaswamy Stadium, Bangalore',
        price: 120.00,
        location: 'Bangalore',
        category: 'Cricket',
        imageUrl: 'https://i.pinimg.com/736x/87/ca/54/87ca54eb2c5ff453d8859354f6937426.jpg',
    },
    {
        id: '9',
        title: 'Royal Rumble 2025',
        description: 'Witness the excitement of the Royal Rumble match!',
        date: '2024-01-28',
        time: '18:00',
        venue: 'TD Garden, Boston',
        price: 250.00,
        location: 'Boston',
        category: 'Wrestling',
        imageUrl: 'https://imageio.forbes.com/specials-images/imageserve/679ea515c4b6492b4763f34b/WWE-Royal-Rumble-2025-from-Indianapolis--Ind-/960x0.jpg?format=jpg&width=960',
    },
    {
        id: '10',
        title: 'Summer Slam 2024',
        description: 'Join us for the biggest summer event in wrestling!',
        date: '2024-08-18',
        time: '19:00',
        venue: 'Ford Field, Detroit',
        price: 300.00,
        location: 'Detroit',
        category: 'Wrestling',
        imageUrl: 'https://i.ytimg.com/vi/jMg9rGlY3qg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDELO3TpqRTGytxFeYr8VEAyooccA',
    },
    {
        id: '11',
        title: 'UCL Final 2024',
        description: 'Watch the UEFA Champions League final live!',
        date: '2024-06-01',
        time: '21:00',
        venue: 'Wembley Stadium, London',
        price: 400.00,
        location: 'London',
        category: 'Football',
        imageUrl: 'https://www.svgeurope.org/wp-content/blogs.dir/17/files/2024/05/UEFA-Banners-for-the-TNT-Editorial-site-1400x467-UCL-1.jpg',
    },
    {
        id: '12',
        title: 'Cricket World Cup Final',
        description: 'Catch the final match of the Cricket World Cup!',
        date: '2024-11-02',
        time: '14:00',
        venue: 'Lord\'s Cricket Ground, London',
        price: 250.00,
        location: 'London',
        category: 'Cricket',
        imageUrl: 'https://www.sportsnile.com/wp-content/uploads/2023/03/ICC-World-Cup-2023-Predictions.jpg',
    },
    {
        id: '13',
        title: 'Horse Racing Derby',
        description: 'Join us for the prestigious horse racing derby!',
        date: '2024-05-05',
        time: '15:00',
        venue: 'Churchill Downs, Louisville',
        price: 150.00,
        location: 'Louisville',
        category: 'Horse Racing',
        imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/170621102602-epsom-derby-winner.jpg?q=x_5,y_237,h_2567,w_4562,c_crop/w_1280',
    },
    {
        id: '14',
        title: 'Rugby World Cup Final',
        description: 'Experience the Rugby World Cup final live!',
        date: '2024-10-28',
        time: '18:00',
        venue: 'Stade de France, Paris',
        price: 300.00,
        location: 'Paris',
        category: 'Rugby',
        imageUrl: 'https://i.dailymail.co.uk/1s/2019/11/01/13/20476008-0-image-a-5_1572613844009.jpg',
    },
    {
        id: '15',
        title: 'Ice Hockey Stanley Cup Final',
        description: 'Don’t miss the thrilling Stanley Cup Final!',
        date: '2024-06-10',
        time: '20:00',
        venue: 'United Center, Chicago',
        price: 200.00,
        location: 'Chicago',
        category: 'Ice Hockey',
        imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/tgam/SQ6W2MAOLRGVNKLSQPWGOKNLMI.JPG',
    },
    {
        id: '16',
        title: 'Volleyball World Championship',
        description: 'Join us for the Volleyball World Championship!',
        date: '2024-09-10',
        time: '17:00',
        venue: 'Nippon Budokan, Tokyo',
        price: 100.00,
        location: 'Tokyo',
        category: 'Volleyball',
        imageUrl: 'https://www.fivb.com/wp-content/uploads/2024/08/101619-scaled.jpeg',
    },
    {
        id: '17',
        title: 'Kabaddi Pro League',
        description: 'Catch the excitement of the Kabaddi Pro League!',
        date: '2024-08-05',
        time: '20:00',
        venue: 'SVP Stadium, Ahmedabad',
        price: 80.00,
        location: 'Ahmedabad',
        category: 'Kabaddi',
        imageUrl: 'https://media.sportstiger.com/media/pro-kabaddi-league-sportstiger-1688380325489-large.jpg',
    },
    {
        id: '18',
        title: 'Golf Masters Tournament',
        description: 'Join us for the prestigious Golf Masters Tournament!',
        date: '2024-04-10',
        time: '09:00',
        venue: 'Augusta National Golf Club, Georgia',
        price: 350.00,
        location: 'Georgia',
        category: 'Golf',
        imageUrl: 'https://www.cbs42.com/wp-content/uploads/sites/81/2021/01/Masters-UPDATED.jpg?w=1920&h=1080&crop=1',
    },
    {
        id: '19',
        title: 'FIFA Women\'s World Cup Final',
        description: 'Join us for the exciting final match of the FIFA Women\'s World Cup!',
        date: '2024-08-10',
        time: '19:00',
        venue: 'Stade de Lyon, Lyon',
        price: 150.00,
        location: 'Lyon',
        category: 'Football',
        imageUrl: 'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/oon47kwhbucwhitysm5b',
    },
    {
        id: '20',
        title: 'Wimbledon Doubles Final',
        description: 'Experience the thrill of the mixed doubles final at Wimbledon!',
        date: '2024-07-14',
        time: '15:00',
        venue: 'All England Club, London',
        price: 200.00,
        location: 'London',
        category: 'Tennis',
        imageUrl: 'https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2019/07/09/2635607-54534710-2560-1440.jpg',
    },
    {
        id: '21',
        title: 'World Series Game 7',
        description: 'Catch the excitement of Game 7 in the World Series!',
        date: '2019-10-30',
        time: '20:00',
        venue: 'Globe Life Field, Arlington',
        price: 250.00,
        location: 'New Jersey',
        category: 'Baseball',
        imageUrl: 'https://i.ytimg.com/vi/vfRBoGhoYZk/maxresdefault.jpg',
    }
];
const LOCATIONS = ['Moscow', 'Los Angeles', 'London', 'Las Vegas','New Jersey'];
const CATEGORIES = [ 'Football', 'Basketball', 'Tennis', 'American Football', 'Mixed Martial Arts'];
export default function SportsPage() {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');
    const filteredSportsEvents = SPORTS_EVENTS.filter(event => {
        const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
        const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        const matchesDate = !selectedDate || event.date === selectedDate;
        return matchesPrice && matchesLocation && matchesCategory && matchesDate;
    });
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Upcoming Sports Events</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm h-fit">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        <div className="space-y-6">
                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className="w-20 px-2 py-1 border rounded"
                                        placeholder="Min"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-20 px-2 py-1 border rounded"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="all">All Locations</option>
                                    {LOCATIONS.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="all">All Categories</option>
                                    {CATEGORIES.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Sports Cards Section */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Sports Events ({filteredSportsEvents.length})
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSportsEvents.map(event => (
                                <SportCard key={event.id} event={event} />
                            ))}
                        </div>
                        {filteredSportsEvents.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No sports events found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}