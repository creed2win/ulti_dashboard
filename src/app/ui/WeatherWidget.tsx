export default function WeatherWidget() {
    return (
        <>
            <iframe src="https://api.wo-cloud.com/content/widget/?geoObjectKey=13442302&language=cs&region=CZ&timeFormat=HH:mm&windUnit=kmh&systemOfMeasurement=metric&temperatureUnit=celsius" name="CW2" scrolling="no" width="300" height="300" style={{ borderRadius: "10px" }}></iframe >
        </>
    )
}