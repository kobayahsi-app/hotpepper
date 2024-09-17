export interface ShopeType {
    id: string
    access: string
    address: string
    budget: Buddget
    budget_memo: string
    barrier_free: string
    card: string
    catch: string
    capacity: string
    child: string
    close: string
    charter: string
    english: string
    free_drink: string
    free_food: string
    genre: Genre
    horigotatsu: string
    large_area: LargeArea
    logo_image: string
    lunch: string
    middle_area: MiddleArea
    midnight: string
    mobile_access: string
    name: string
    name_kana: string
    non_smoking: string
    open: string
    party_capacity: string
    parking: string
    photo: Photo
    private_room: string
    small_area: SmallArea
    station_name: string
    sub_genre: SubGenre
    tatami: string
    urls: Urls
    wedding: string
    wifi: string
}

interface Urls {
    pc: string
}
interface LargeArea {
    code: string
    name: string
}
interface MiddleArea {
    code: string
    name: string
}
interface SmallArea {
    code: string
    name: string
}
interface Genre {
    code: string
    name: string
    catch: string
}
interface SubGenre {
    code: string
    name: string
}
interface Buddget {
    code: string
    name: string
}
interface Photo {
    pc: {l: string, m: string, s: string}
    mobile: {l: string, s: string}
}