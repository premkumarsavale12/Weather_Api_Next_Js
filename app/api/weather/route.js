
export async function GET(request) {

    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city');

    const apiKey = "0caf6b39adde00f197db6601276f25b0";


    if (!city) {
        return res.status(400).json({ error: 'City parameter is required.' });
    }

    try {
        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        );

        const data = await response.json();
        console.log(data);


        if (response.ok) {


            return new Response(JSON.stringify(data), { status: 200 });

        }
        else {

            return new Response(JSON.stringify({ error: data.message || 'Error fetching weather data.' }), { status: response.status });

        }
    }
    catch (error) {

        console.error('API call error:', error);

        return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 });


    }


}
