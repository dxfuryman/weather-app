import { getweather} from "./weather.js";
getweather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone).then(res => {
    console.log(res.data)
})