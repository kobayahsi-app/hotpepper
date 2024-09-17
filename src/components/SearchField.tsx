'use client';
import SelectField from "@/UIKit/SelectField";
import { AreaItem } from "@/util/area";
import { GenreItem } from "@/util/genre";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    areaCode: string | null,
    genreCode: string | null,
    resultKeyword: string | null,
}

export const SearchField = ({ areaCode = "", genreCode = "", resultKeyword = ""}: Props) => {
    const router = useRouter();
    const [area, setArea] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");

    useEffect(() => {
        if(areaCode !== null) {
            setArea(areaCode);
        }
        if(genreCode !== null) {
            setGenre(genreCode)
        }
        if(resultKeyword !== null) {
            setKeyword(resultKeyword);
        }
    }, [])

    const handleSearch = () => {
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

        router.push(
            `/search${areaCode}${genreCode}${resultKeyword}`
        )
    };
    return(
        <div className="search_block">
            {SelectField(AreaItem, area, setArea)}
            {SelectField(GenreItem, genre, setGenre)}
            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="キーワード" />
            <button onClick={() => handleSearch()}>検索</button>
        </div>
    )
}