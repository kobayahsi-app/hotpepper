import { ShopeType } from "@/types/shop"

type Props = {
    shop: ShopeType
}

const changeFreeDrinkText = (freeDrink: string) => {
    if(freeDrink.includes('あり')) {
        freeDrink = "あり";
        return freeDrink;
    } else if(freeDrink.includes('なし')) {
        freeDrink = "なし";
        return freeDrink;
    }
}
const changeFreeFoodText = (freeFood: string) => {
    if(freeFood.includes('あり')) {
        freeFood = "あり";
        return freeFood;
    } else if(freeFood.includes('なし')) {
        freeFood = "なし";
        return freeFood;
    }
}
// const changePrivateRoomText = (privateRoom: string) => {
//     if(privateRoom.includes('あり')) {
//         privateRoom = privateRoom.replace(/あり/g, "個室あり");
//         return privateRoom;
//     } else if(privateRoom.includes('なし')) {
//         privateRoom = "";
//         return privateRoom;
//     }
// }

export const ShopCard = ({ shop }: Props) => {
    return(
        <div style={{marginBottom: 20}} key={shop.id}>
            <p>
                &quot;店名&quot;:{shop.name},<br />
                &quot;住所&quot;:{shop.address},<br />
                &quot;最寄り駅&quot;:{shop.station_name}駅,<br />
                &quot;ジャンル&quot;:{shop.genre.name},<br />
                &quot;予算&quot;:{shop.budget.name},<br />
                &quot;飲み放題&quot;:{changeFreeDrinkText(shop.free_drink)}, <br />
                &quot;食べ放題&quot;:{changeFreeFoodText(shop.free_food)}, <br />
                &quot;深夜営業&quot;:{shop.midnight}, <br />
                &quot;個室&quot;:{shop.private_room}, <br />
                &quot;特徴&quot;:{shop.genre.catch + shop.catch}, <br />
                &quot;詳細&quot;:{shop.urls.pc}, <br />
            </p>
        </div>
    )
}