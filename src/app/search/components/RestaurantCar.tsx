import Price from "@/app/components/Price";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link";
import { avgRating } from "../../../../utils/avgRating";
import Stars from "@/app/components/Stars";

interface Restaurant{
    id: number,
    name: string,
    main_image: string,
    price: PRICE,
    cuisine: Cuisine,
    location: Location,
    slug: string, 
    reviews: Review[],
}    


export default function RestaurantCard({restaurant,}:{restaurant:Restaurant} ){
        const revrat = ()=>{
            const rating = avgRating(restaurant.reviews)
            if(rating>4) return "Amazing"
            else if(rating<=4 && rating>3) return "Very Good"
            else if(rating<=3 && rating>2) return "Good";
            else if(rating<=2 && rating>=1)return "Average";
            else return ""
        }

    return(
        <div className="border-b flex pb-5 ml-4">

            <img
                src={restaurant.main_image}
                alt=""
                className="w-44 h-26 rounded"
            />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-start">
                <div className="flex mb-2"><Stars reviews={restaurant.reviews}/></div>
                <p className="ml-2 text-sm">{revrat()}</p>
                
                </div>
                <div className="mb-9">
                <div className="font-light flex text-reg">
                    <Price price={restaurant.price}/>
                    <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
                    <p className="mr-4 capitalize">{restaurant.location.name}</p>
                </div>
                </div>
                <div className="text-red-600">
                <Link  href={`/restaurant/${
                    restaurant.slug
                }`}>View more information</Link>
                </div>
            </div>
       
        </div>
    )
}