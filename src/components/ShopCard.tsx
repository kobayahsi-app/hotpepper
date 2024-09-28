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
const changePrivateRoomText = (privateRoom: string) => {
    if(privateRoom.includes('あり')) {
        privateRoom = privateRoom.replace(/あり/g, "個室あり");
        return privateRoom;
    } else if(privateRoom.includes('なし')) {
        privateRoom = "";
        return privateRoom;
    }
}

export const ShopCard = ({ shop }: Props) => {
    return(
        <div style={{marginBottom: 20}} key={shop.id}>
            <p>
                "店名":{shop.name},<br />
                "住所":{shop.address},<br />
                "最寄り駅":{shop.station_name}駅,<br />
                "ジャンル":{shop.genre.name},<br />
                "予算":{shop.budget.name},<br />
                "飲み放題:{changeFreeDrinkText(shop.free_drink)}, <br />
                "食べ放題:{changeFreeFoodText(shop.free_food)}, <br />
                "深夜営業:{shop.midnight}, <br />
                "個室:{shop.private_room}, <br />
                "特徴:{shop.genre.catch + shop.catch}, <br />
                "詳細:{shop.urls.pc}, <br />
            </p>
        </div>
    )
}