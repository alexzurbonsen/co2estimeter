# CO2estimeter

CO2estimeter is a web extension to estimate the carbon impact of web browsing activity.

<img src=assets/co2estimeter_demo_screenshot.png alt="CO2estimeter Demo" />

## How to install

CO2estimeter has been tested for Firefox and Chrome. It is not yet available on the official distribution channels of Firefox and Chrome.

But you can install it manually by following the installation instructions for temporary [extension installs in Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/) or [unpacked extensions in Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).

Just download the archive for your browser from [Releases](https://github.com/alexzurbonsen/co2estimeter/releases) and proceed according to the instructions that apply to your browser. If you are installing CO2estimeter for Chrome you need to unpack the archive first.

### Build from source

If you want to build the extension your self, clone this repository and run

```bash
pnpm install && pnpm run build:<firefox | chrome>
```

The artifacts are created in the `extension` directory.

## Methodology

### How are CO<sub>2</sub>e emissions for browsing activity calculated?

CO2estimeter uses the <strong>[Sustainable Webdesign Model v4](https://sustainablewebdesign.org/estimating-digital-emissions/)</strong> (SWD) to calculate the CO<sub>2</sub>e value of green house gas emissions associated with browsing activity. For the calculations it uses the [co2.js library](https://developers.thegreenwebfoundation.org/co2js/overview/) from the [Green Web Foundation](https://www.thegreenwebfoundation.org).

### How does the SWD model work?

The following section provides a short summary. The full picture can be found [here](https://sustainablewebdesign.org/estimating-digital-emissions).

There are many variables along the path of the packets you requested to
load a webpage that contribute to energy consumption you the page load.
Taking into a account all these variables to get an estimate of the
involved emissions, is unfeasible, may be also impossible. The SWD model
thus breaks down this complexity by focussing on the number of bytes
that are transferred over the wire (and air) to your device. The model
uses data on the average energy consumption of three segments of the
internet, data centers, network and user devices, to provide estimates
for the average energy consumption per transferred byte. With these
values it computes the estimated energy that is necessary to get, send
and process the bytes to your device. Finally, the energy values are
multiplied by the grid carbon intensity to get an green house gas
emissions estimate in CO<sub>2</sub>e. The grid carbon intensity is the amount of CO<sub>2</sub>e emitted per kWh of electricity produced.

If you want to know more about the modelling choices, there is also this
intersting [article about the variance in estimates of CO<sub>2</sub>e
emissions for internet activity](https://www.wholegraindigital.com/blog/website-energy-consumption/)

The SWD model comes with a couple of knobs. You can use different grid
intensities for the different segments. You can also play around with an
estimated green hosting percentage. In the context of the CO2estimeter,
this is the percentage of data centers running on renewable or
zero-carbon energy.

Of course, the approach has limitations. It does not take into account
the energy consumption of the server that processes your request for
example. Taken to an extreme, if your request causes a server work to do
some heavy work for a whole day but it only sends back a short message
once it is finished, the estimated energy consumption of your request
would just reflect the length of the short message, not the work the
server has done. Also the distance that the requested data has covered
on the way to your device does not have an effect on the estimates.

### How does CO2estimeter collect the necessary data and store it?

This extension leverages the Performance API that is available in
browsers. It can continuously observe network requests and provide
performance data about them. This also includes the so called
[transfer size](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/transferSize). That is the size of the response as it is sent over the network to your device (as opposed to the decoded or decompressed size of the resource).

It is zero if the data was obtained from local cache or a CORS request.
The size of requests is not tracked. If you are looking for an overview
of how the Performance API can be used, check out [this blog](https://fershad.com/writing/including-user-interaction-in-website-carbon-estimates/) or [Mozilla's docs](https://developer.mozilla.org/en-US/docs/Web/API/Performance).
CO2estimeter collects this transfer sizes for all requests from a browser
tab and attributes them to the domain of the page that is loaded in the
tab. The data is stored in the local browser storage. You can delete it
by pressing the "Reset" button of CO2estimeter in the top bar.

The comparisons of the estimated CO<sub>2</sub>e emissions are done with
functions from the [grasp](https://github.com/hoernschen/grasp) package.
For further information on its data check out its [wiki page](https://github.com/hoernschen/grasp/wiki).
