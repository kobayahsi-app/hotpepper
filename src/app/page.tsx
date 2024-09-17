'use client';
import Header from "@/components/Header";
import { SearchField } from "@/components/SearchField";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <main id="mv">
        <Image src={"/img/main.jpg"} width={1200} height={800} alt="" />
        <div className="search">
          <SearchField areaCode="" genreCode="" resultKeyword="" />
        </div>
      </main>
      <footer>
        Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパーグルメ Webサービス</a>
      </footer>
    </div>
  );
}
