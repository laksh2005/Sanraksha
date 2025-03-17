import { useState, useEffect } from "react";
import { User } from "lucide-react";



const Safezones = (props) => {
    const position={lat:props.lat,
        lng:props.lng
    }

    const [curr_position, func] = useState({})


    useEffect(() => {
        let a = confirm("Sanraksha wants to know your location")
        if (a == 1) {
            initMap()
        }
    }, [])

    let map, infoWindow;

    function geocodeLatLng(geocoder, map, curr_location, infowindow) {


        const latlng = {
            lat: curr_location.lat,
            lng: curr_location.lng,
        };

        geocoder
            .geocode({ location: latlng })
            .then((response) => {
                if (response.results[0]) {
                    //to get postal code

                    //   let size=response.results[0].address_components.length;
                    //  console.log(response.results[0].address_components[size-1]);
                    // console.log(response.results);


                } else {
                    window.alert("No results found");
                }
            })
            .catch((e) => window.alert("Geocoder failed due to: " + e));
    }



    async function findPlaces(position) {
        // console.log(loc);

        const { Place } = await google.maps.importLibrary("places");
        const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker");


        async function police_markers() {


            const parser = new DOMParser();
            // A marker with a custom inline SVG.
            const pinSvgString =
                '<svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.98 511.98" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#edac07;" d="M472.32,284.082c-4.562-11.375-10.718-22.366-16.655-33.007l-0.312-0.539 c-7.062-12.625-15.062-26.944-21.281-43.396c-14.812-39.202-0.375-53.857,19.625-74.154l18.312-18.601 c0-0.016,0.031-0.031,0.031-0.055c3.562-3.656,5.5-8.406,5.5-13.382c0-5.695-2.531-11.07-6.969-14.742l-1.938-1.64 c-0.031-0.016-0.031-0.039-0.062-0.055l-96.31-79.418c-3.969-3.531-9.062-5.352-14.343-5.062c-4.874,0.273-9.437,2.328-12.874,5.797 c-0.094,0.094-0.188,0.195-0.281,0.297c-3.781,4.109-7.531,8.289-9.188,10.187l-3.125,3.641 c-7.344,8.562-14.906,17.414-23.437,17.414c-10.03,0-20.499-11.578-28.905-20.875l-0.125-0.141 c-3.531-3.953-7.719-8.171-11.195-11.257l-0.406-0.359c-0.297-0.266-0.609-0.516-0.922-0.742c-3.453-2.469-7.188-3.812-11.077-3.977 c-0.312-0.008-0.625-0.008-0.953,0.008c-4.156,0.195-8.25,1.773-11.516,4.438c-0.125,0.109-0.25,0.211-0.375,0.328 c-3.688,3.297-7.859,7.477-11.5,11.492c-8.453,9.398-18.968,21.085-29.077,21.085c-8.593,0-16.139-8.875-23.483-17.492l-3.031-3.547 c-0.047-0.055-0.094-0.109-0.141-0.164c-1.547-1.727-5.187-5.765-8.734-9.703c-0.141-0.156-0.281-0.312-0.438-0.461 c-3.922-3.867-9-6-14.296-6c-4.766,0-9.328,1.727-12.906,4.867L42.751,85.035c-0.031,0.039-0.078,0.07-0.109,0.101l-1.297,1.109 c-4.375,3.68-6.89,9.039-6.89,14.703c0,4.992,1.937,9.742,5.468,13.382c0.016,0.023,0.047,0.039,0.062,0.062l18.312,18.569 c19.983,20.32,34.42,34.991,19.593,74.177c-6.359,16.851-14.39,31.147-21.499,43.787l-0.078,0.125 c-12.078,21.624-24.562,43.967-24.562,70.873c0,36.436,12.218,69.371,35.327,95.261c22.812,25.577,55.013,43.67,95.684,53.764 c50.326,12.469,56.201,17.109,80.81,36.593c3.296,2.625,8.062,3.812,10.625,4.266c0.625,0.109,1.266,0.172,1.891,0.172 c0.109,0,0.219,0,0.312,0c4.405-0.125,8.53-1.641,11.874-4.328c24.711-19.577,30.586-24.233,80.928-36.702 c40.653-10.062,72.84-28.155,95.714-53.779c23.093-25.89,35.312-58.841,35.312-95.245C480.226,309.675,477.633,297.3,472.32,284.082 z"></path> <path style="fill:#F6BB42;" d="M255.727,138.657c-64.685,0-117.324,52.639-117.324,117.332c0,64.686,52.639,117.339,117.324,117.339 c64.692,0,117.347-52.653,117.347-117.339C373.074,191.296,320.42,138.657,255.727,138.657z"></path> <path style="opacity:0.05;enable-background:new ;" d="M149.075,255.989c0-62.904,49.764-114.402,111.995-117.207 c-1.766-0.078-3.546-0.125-5.343-0.125c-64.685,0-117.324,52.639-117.324,117.332c0,64.686,52.639,117.339,117.324,117.339 c1.797,0,3.577-0.062,5.343-0.141C198.839,370.391,149.075,318.893,149.075,255.989z"></path> <path style="fill:#F6BB42;" d="M341.076,106.658H170.403c-5.891,0-10.671-4.773-10.671-10.663c0-5.891,4.781-10.664,10.671-10.664 h170.673c5.906,0,10.688,4.773,10.688,10.664C351.763,101.885,346.982,106.658,341.076,106.658z"></path> <path style="fill:#ED5564;" d="M356.2,224.787c-0.875-2.68-3.187-4.625-5.968-5.031l-60.561-8.796l-27.07-54.857 c-1.234-2.523-3.797-4.117-6.624-4.117c-2.797,0-5.375,1.593-6.609,4.117l-27.077,54.857l-60.544,8.796 c-2.781,0.406-5.093,2.352-5.968,5.031c-0.859,2.672-0.141,5.602,1.875,7.57l43.811,42.693l-10.343,60.311 c-0.469,2.766,0.656,5.562,2.937,7.219c1.281,0.938,2.812,1.406,4.344,1.406c1.172,0,2.359-0.281,3.438-0.844l54.139-28.468 l54.162,28.468c2.5,1.312,5.499,1.094,7.78-0.562s3.406-4.453,2.938-7.219l-10.343-60.311l43.812-42.693 C356.325,230.388,357.044,227.459,356.2,224.787z"></path> <g> <path style="fill:#DA4453;" d="M289.672,210.959l-27.07-54.857c-1.234-2.523-3.797-4.117-6.624-4.117v103.386L289.672,210.959z"></path> <path style="fill:#DA4453;" d="M310.514,275.051l43.812-42.693c1.999-1.969,2.718-4.898,1.874-7.57l-100.223,30.585 L310.514,275.051z"></path> <path style="fill:#DA4453;" d="M255.977,314.675l54.162,28.468c1.781,0.938,3.843,1.094,5.718,0.484l2.062-1.047l-61.942-87.208 L255.977,314.675L255.977,314.675z"></path> <path style="fill:#DA4453;" d="M201.464,275.051l-10.343,60.311c-0.469,2.766,0.656,5.562,2.937,7.219l61.92-87.208 L201.464,275.051z"></path> <path style="fill:#DA4453;" d="M155.778,224.787l100.199,30.585l-33.687-44.413l-60.544,8.796 C158.966,220.162,156.653,222.107,155.778,224.787z"></path> </g> <path style="fill:#F6BB42;" d="M348.826,387.811c-4.125-4.187-10.875-4.218-15.062-0.078c-0.062,0.031-4.5,3.938-14.906,7.969 c-11.28,4.391-31.404,9.624-63.13,9.624c-58.217,0-78.419-18.171-78.622-18.358l0.125,0.125v0.016 c-1.922-1.937-4.593-3.124-7.531-3.124c-5.891,0-10.671,4.78-10.671,10.655c0,2.984,1.218,5.672,3.187,7.608 c2.719,2.688,26.749,24.391,93.512,24.391c67.099,0,90.567-21.312,93.036-23.75C352.951,398.764,352.982,391.999,348.826,387.811z"></path> <g style="opacity:0.2;"> <path style="fill:#FFFFFF;" d="M472.32,284.082c-4.562-11.375-10.718-22.366-16.655-33.007l-0.312-0.539 c-7.062-12.625-15.062-26.944-21.281-43.396c-14.812-39.202-0.375-53.857,19.625-74.154l18.312-18.601 c0-0.016,0.031-0.031,0.031-0.055c3.562-3.656,5.5-8.406,5.5-13.382c0-5.695-2.531-11.07-6.969-14.742l-1.938-1.64 c-0.031-0.016-0.031-0.039-0.062-0.055l-96.31-79.418c-3.969-3.531-9.062-5.352-14.343-5.062c-3.437,0.195-6.718,1.273-9.562,3.109 c0.906,0.578,1.781,1.227,2.594,1.953l96.276,79.419c0.031,0.016,0.062,0.039,0.062,0.055l1.969,1.64 c4.406,3.672,6.969,9.047,6.969,14.742c0,4.976-1.969,9.726-5.5,13.382c-0.031,0.023-0.062,0.039-0.062,0.055l-18.312,18.601 c-19.999,20.297-34.436,34.952-19.624,74.154c6.219,16.452,14.218,30.772,21.28,43.396l0.312,0.539 c5.938,10.641,12.094,21.632,16.656,33.007c5.312,13.218,7.906,25.593,7.906,37.843c0,36.404-12.188,69.355-35.28,95.245 c-22.874,25.624-55.092,43.717-95.746,53.779c-50.342,12.469-56.209,17.125-80.911,36.702c-0.5,0.406-1.031,0.766-1.562,1.109 c3.062,1.781,6.688,2.656,8.812,3.047c0.625,0.109,1.266,0.172,1.891,0.172c0.109,0,0.219,0,0.312,0 c4.405-0.125,8.53-1.641,11.874-4.328c24.711-19.577,30.586-24.233,80.928-36.702c40.653-10.062,72.84-28.155,95.714-53.779 c23.093-25.89,35.312-58.841,35.312-95.245C480.226,309.675,477.633,297.3,472.32,284.082z"></path> </g> </g></svg>';
            const pinSvg = parser.parseFromString(
                pinSvgString,
                "image/svg+xml",
            ).documentElement;
            const glyphImg = document.createElement("img");

            glyphImg.src =
                "https://i.postimg.cc/TwQCDD85/19068317-removebg-preview.png";
            glyphImg.width = "25"
            const glyphSvgPinElement = new PinElement({
                glyph: glyphImg,
            });
            const pinScaled = new PinElement({
                scale: 1.3,
                borderColor: "#f5c842",
                background: "#2b50e3",
                glyphColor: "white",
                glyph: glyphImg,
            });
            const request = {
                textQuery: "police",
                fields: ["displayName", "location", "businessStatus", "nationalPhoneNumber"],
                // includedType: "police station",
                locationBias: position,
                isOpenNow: true,
                language: "en-US",
                maxResultCount: 8,
                region: "in",
                useStrictTypeFiltering: false,
            };
            //@ts-ignore
            const { places } = await Place.searchByText(request);

            if (places.length) {
                // console.log(places);

                const { LatLngBounds } = await google.maps.importLibrary("core");
                const bounds = new LatLngBounds();

                // Loop through and get all the results.
                places.forEach((place) => {
                    const markerView = new AdvancedMarkerElement({
                        map,
                        position: place.location,
                        title: place.displayName,
                        content: pinScaled.element.cloneNode(true),
                        gmpClickable: true,
                    });
                    markerView.addEventListener("gmp-click", () => {


                        infoWindow.close();
                        infoWindow.setContent(markerView.title);
                        infoWindow.open(markerView.map, markerView);
                    })
                    bounds.extend(place.location);
                    // console.log(place);
                });
                map.fitBounds(bounds);
            } else {
                console.log("No results");
            }
        }

        async function hospital_markers() {

            const parser = new DOMParser();
            // A marker with a custom inline SVG.
            const pinSvgString =
                '<svg height="50" viewBox="0 0 24 50" fill="red" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m12 2c3.86 0 7 3.13 7 7 0 5.25-7 13-7 13s-7-7.75-7-13a7 7 0 0 1 7-7m-3 4v6h2v-2h2v2h2v-6h-2v2h-2v-2z"/></svg>';
            const pinSvg = parser.parseFromString(
                pinSvgString,
                "image/svg+xml",
            ).documentElement;
            const pinScaled = new PinElement({
                scale: 1.3,
                borderColor: "#f5f4f0",
                background: "#e31414",
                glyphColor: "white",
                glyph: "H",
            });
            const request = {
                textQuery: "hospital",
                fields: ["displayName", "location", "businessStatus", "nationalPhoneNumber"],
                //includedType: "police station",
                locationBias: position,
                isOpenNow: true,
                language: "en-US",
                maxResultCount: 8,
                region: "in",
                useStrictTypeFiltering: false,
            };
            //@ts-ignore
            const { places } = await Place.searchByText(request);

            if (places.length) {
                // console.log(places);

                const { LatLngBounds } = await google.maps.importLibrary("core");
                const bounds = new LatLngBounds();

                // Loop through and get all the results.
                places.forEach((place) => {
                    const markerView = new AdvancedMarkerElement({
                        map,
                        position: place.location,
                        title: place.displayName,
                        content: pinScaled.element.cloneNode(true),
                        gmpClickable: true,
                    });
                    markerView.addEventListener("gmp-click", () => {


                        infoWindow.close();
                        infoWindow.setContent(markerView.title);
                        infoWindow.open(markerView.map, markerView);
                    })
                    bounds.extend(place.location);
                    // console.log(place);
                });
                map.fitBounds(bounds);
            } else {
                console.log("No results");
            }
        }
        hospital_markers()
        police_markers()

    }


    async function getlocation() {
        const geocoder = new google.maps.Geocoder();
        const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    func(pos)

                    // console.log(curr_position);



                    findPlaces(pos)
                    geocodeLatLng(geocoder, map, pos, infoWindow)

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Your location");
                    infoWindow.open(map);
                    map.setCenter(pos);
                    const glyphImg = document.createElement("img");

                    glyphImg.src =
                        "https://cdn-icons-png.flaticon.com/512/9187/9187604.png";
                    glyphImg.width = "25"
                    const pinScaled = new PinElement({
                        scale: 1.5,
                        background: "#062c9e",
                        borderColor: "#1e21e3",
                        glyphColor: "white",
                        glyph: glyphImg,
                    });
                    const beachFlagImg = document.createElement("img");

                    beachFlagImg.src =
                        "https://i.postimg.cc/sfZ8HGDr/user-location-1.png";
                    beachFlagImg.width = "80"
                    const marker = new AdvancedMarkerElement({
                        map,
                        position: pos,
                        content: pinScaled.element,
                    });

                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }



    }
    async function initMap() {
        const { Map } = await google.maps.importLibrary("maps");
        const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker");



        map = new Map(document.getElementById("map"), {
            center: { lat: 28.7041, lng: 77.1025 },
            zoom: 13,
            mapTypeId: 'satellite',
            mapId: "DEMO_MAP_ID",
        });
        infoWindow = new google.maps.InfoWindow();
        getlocation()


    }




    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">


                <div className="absolute space-y-4 text-left inset-0 z-10  opacity-100 flex flex-col items-center justify-center text-clr1 font-bold ">
                {/* <div className="py-4"> */}
                    <div id="map" className="mx-auto rounded-xl h-2/3 w-2/3 mb-4" />
                    *Click on the markers to know info
                    <div className="mx-auto h-6 flex text-clr1 text-xl font-bold mb-3 items-center">

                        <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="user" width={30} height={60} />
                        - Your Location
                    </div>
                    <div className="mx-auto h-6 flex text-clr1 text-xl font-bold mb-3 items-center ">
                        <div className="bg-red-600 w-10 h-10 text-white border-white border-2 flex items-center justify-center">
                            H
                        </div>

                        - Hospitals
                    </div>
                    <div className="mx-auto h-6 flex text-clr1 text-xl font-bold items-center">
                        <img src="https://i.postimg.cc/TwQCDD85/19068317-removebg-preview.png" alt="user" width={35} height={60} />
                        -Police Stations

                    </div>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default Safezones