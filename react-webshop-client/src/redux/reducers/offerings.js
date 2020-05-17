
const initialState =[{
    header: "All new iPhone 11 Pro",
    image: "https://johnlewis.scene7.com/is/image/JohnLewis/238349140alt3?$rsp-pdp-port-1440$",
    link: "/product/AI16SG"
},{
    header: "All new Macbook Pro 13",
    image: "https://www.cinema5d.com/wp-content/uploads/2020/05/Apple_2020_13-inch_MacBook_Pro_Header.jpg",
    link: "/product/MBP13"
},{
    header: "All new iPad Pro 2020",
    image: "https://icdn2.digitaltrends.com/image/digitaltrends/ipad-pro-2018-review-5848.jpg",
    link: "/product/IP2020"
}]

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}