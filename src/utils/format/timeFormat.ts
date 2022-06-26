interface dateDataType {
    dateData: string;
}
export const timeFormat = (date: string): string => {
    const dateData: dateDataType = {
        dateData: date
    }
    // 深拷贝
    const dateDataJson = JSON.stringify(dateData)
    const dateDataJsonParse = JSON.parse(dateDataJson)
    const dateDataJsonParseDate = dateDataJsonParse.dateData
    const dateDataJsonParseDateParse = new Date(dateDataJsonParseDate)
    const dateDataJsonParseDateParseYear = dateDataJsonParseDateParse.getFullYear()
    const dateDataJsonParseDateParseMonth = dateDataJsonParseDateParse.getMonth() + 1
    const dateDataJsonParseDateParseDate = dateDataJsonParseDateParse.getDate()
    const dateDataJsonParseDateParseHours = dateDataJsonParseDateParse.getHours()
    const dateDataJsonParseDateParseMinutes = dateDataJsonParseDateParse.getMinutes()
    const dateDataJsonParseDateParseSeconds = dateDataJsonParseDateParse.getSeconds()
    // const dateDataJsonParseDateParseMilliseconds = dateDataJsonParseDateParse.getMilliseconds()
    const dateDataJsonParseDateParseTime = `${dateDataJsonParseDateParseYear}-${dateDataJsonParseDateParseMonth}-${dateDataJsonParseDateParseDate} ${dateDataJsonParseDateParseHours}:${dateDataJsonParseDateParseMinutes}:${dateDataJsonParseDateParseSeconds}`
    return dateDataJsonParseDateParseTime
}