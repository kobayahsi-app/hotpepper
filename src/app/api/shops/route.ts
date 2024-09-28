import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiKey = "7e39e7c79c80f8a5";
    const searchParams = req.nextUrl.searchParams;
    const area = searchParams.get('area');
    const genre = searchParams.get('genre');
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');

    let areaCode = "";
    let genreCode = "";
    let resultKeyword = "";
    let startNum = "&start=1";
    if (area !== "null") {
        areaCode = `&middle_area=${area}`;
    } 
    if (genre !== "null") {
        genreCode = `&genre=${genre}`;
    }
    if (keyword !== "null") {
        resultKeyword = `&keyword=${keyword}`;
    }
    if(page !== null) {
        const num = Number(page) * 50 - 49;
        startNum = `&start=${num}`
    }
    const searchURL = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1?key=${apiKey}&large_area=Z091${areaCode}${genreCode}${resultKeyword}${startNum}`;

    try {
        const response = await axios.get(`${searchURL}&count=50&format=json`);
        const data = await response.data;

        return NextResponse.json(data.results);
    } catch(error) {
        console.log(error);
        return NextResponse.json({ Message: error, status: 500 })
    }
}