'use client';
import Header from "@/components/Header";
import { SearchField } from "@/components/SearchField";
import { ShopCard } from "@/components/ShopCard";
import { ShopeType } from "@/types/shop";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const area = searchParams.get('area');
    const genre = searchParams.get('genre');
    const keyword = searchParams.get('keyword');
    const pageParams = searchParams.get('page');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shops, setShops] = useState<ShopeType[] | []>([]);
    const [total, setTotal] = useState<number>(0);
    const [navs, setNavs] = useState<number[] | []>([]);
    const [page, setPage] = useState<string>('');

    useEffect(() => {
        if(pageParams === null) {
            setPage('1');
        } else {
            setPage(pageParams)
        }
        const fetchData = async() => {
            let areaCode = "";
            let genreCode = "";
            let resultKeyword = "";
            let pageCode = "";
            setIsLoading(true);
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
            if(pageParams === null) {
                pageCode 
            }
            if(area === "" && genre === "" && keyword === "") {
                if(pageParams === null) {
                    pageCode = `?page=${1}`
                } else {
                    pageCode = `?page=${pageParams}`
                }
            } else {
                if(pageParams === null) {
                    pageCode = `&page=${1}`
                } else {
                    pageCode = `&page=${pageParams}`
                }
            }
            const response = await axios.get(`api/shops${areaCode}${genreCode}${resultKeyword}${pageCode}`);
            if(response.status === 200) {
                setIsLoading(false);
            }
            setShops(response.data.shop);
            setTotal(response.data.results_available)
            const pageNation = Math.ceil(response.data.results_available / 50);
            const newNav = Array.from({ length: pageNation }, (_, i) => i + 1);
            setNavs(newNav);
        }
        fetchData();
    }, [area, genre, keyword, pageParams]);

    const pageNation = (nav: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('page', nav); // page=n を追加
        router.push(`?${currentParams.toString()}`); // 新しいクエリパラメータでページ遷移
    }
    return(
        <div id="search">
            <Header />
            <div className="search">
                <SearchField areaCode={area} genreCode={genre} resultKeyword={keyword} />
            </div>
            <main>
                <h2>検索結果（{total}件）</h2>
                {isLoading ? (
                    <div>
                        <CircularProgress />
                    </div>
                ) : (
                    shops.length > 0 && (
                        shops.map((shop) => (
                            <ShopCard shop={shop} key={shop.id} />
                        ))
                    )
                )}
                <ul className="nav">
                    {navs.length > 0 && (
                        navs.map((nav) => (
                            <li 
                                className={page === nav.toString() ? "active" : ""} 
                                onClick={() => pageNation(nav.toString())}
                                key={nav}
                            >{nav}</li>
                        ))
                    )}
                </ul>
            </main>
            <footer>
                Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパーグルメ Webサービス</a>
            </footer>
        </div>
    )
}