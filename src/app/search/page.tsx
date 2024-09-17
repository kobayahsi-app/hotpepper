'use client';
import Header from "@/components/Header";
import { SearchField } from "@/components/SearchField";
import { ShopeType } from "@/types/shop";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const area = searchParams.get('area');
    const genre = searchParams.get('genre');
    const keyword = searchParams.get('keyword');
    const [shops, setShops] = useState<ShopeType[] | []>([]);
    useEffect(() => {
        const fetchData = async() => {
            let areaCode = "";
            let genreCode = "";
            let resultKeyword = "";
            if (area !== "") {
                areaCode = `?area=${area}`;
            } 
            if (genre !== "") {
                // areaCodeが空なら`?`を使う
                genreCode = `${areaCode === "" ? "?" : "&"}genre=${genre}`;
            }
            if (keyword !== "") {
                // areaCodeとgenreCodeの両方が空なら`?`を使う
                resultKeyword = `${areaCode === "" && genreCode === "" ? "?" : "&"}keyword=${keyword}`;
            }
            const response = await axios.get(`api/shops${areaCode}${genreCode}${resultKeyword}`);
            setShops(response.data.shop);
        }
        fetchData();
      }, [area, genre, keyword])
    return(
        <div id="search">
            <Header />
            <div className="search">
                <SearchField areaCode={area} genreCode={genre} resultKeyword={keyword} />
            </div>
            <main>
                <h2>検索結果</h2>
                {shops.length > 0 && (
                    shops.map((shop) => (
                        <ul key={shop.id}>
                            <li>{shop.name}</li>
                        </ul>
                    ))
                )}
            </main>
            <footer>
                Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパーグルメ Webサービス</a>
            </footer>
        </div>
    )
}