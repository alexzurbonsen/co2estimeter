// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import text from '../../text/text';

export function MethodologyTab() {
  return (
    <Paper elevation={0} sx={{ maxHeight: '380px', overflow: 'auto' }}>
      <Typography variant="h6">
        How are CO<sub>2</sub> emissions for browsing activity calculated?
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Before a webpage is displayed in your browser window the data has to be
        transmitted from a server, that is typically somewhere in a data center,
        to your device. The path the data takes, leads through various
        intermediate stations, until it is received by your device. The server
        processing your request, sending the data over the network and
        processing it on your device involves energy costs.
        <br />
        There are many variables along the path of your requested packets that
        determine the energy consumption. How is it possible to estimate the
        energy consumption and CO<sub>2</sub> emissions of such a convoluted and
        variable process? Well, it is not. But you can take a qualified guess.
        You can break down the complexity by just looking at the number of bytes
        that are transferred over the wire (and air) to your device. By
        analysing the energy usage of different segments of the internet that
        are involved in the data processing and transfer you can get estimates
        for the average energy consumption per transferred byte. From these
        energy consumption estimates you compute the CO<sub>2</sub>e emissions
        by multiplying with the grid carbon intensity. That is the amount of CO
        <sub>2</sub>e emitted per kWh of electricity produced.
        <br />
        This is what the{' '}
        <Link
          href={
            'https://sustainablewebdesign.org/estimating-digital-emissions/'
          }
        >
          <strong>Sustainable Webdesign Model</strong>
        </Link>{' '}
        (SWD) does, whose v4 is used by {text.name}. The SWD includes three
        segments: data centers, network and user devices. Further details of the
        model can be found under the linked page. It also includes an{' '}
        <Link
          href={
            'https://www.wholegraindigital.com/blog/website-energy-consumption/'
          }
        >
          intersting article about the variance in estimates of CO<sub>2</sub>e
          emissions for internet activity
        </Link>
        .
        <br />
        You can configure the model to use different grid intensities for
        different segments of the data processing and transfer. You can also
        play around with an estimated green hosting percentage. In the context
        of the {text.name}, this is the percentage of data centers running on
        renewable or zero-carbon energy.
        <br />
        Of course, the approach has limitations. It does not take into account
        the energy consumption of the server that processes your request. Taken
        to an extreme, if your request makes a server work for one hour until it
        sends you a short message back, the actual energy consumption of your
        request would be vastly underestimated. Also the distance that the
        requested data is travelling through the network does not have an effect
        on estimates.
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        How does {text.name} collect the necessary data and store it?
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        This extension leverages an API that is available in the browser, called
        the Performance API. It can continuously observe network requests and
        provide performance data about them. This also includes the so called{' '}
        <Link
          href={
            'https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/transferSize'
          }
        >
          transfer size
        </Link>
        . That is the size of the response as it is sent over the network to
        your device (as oposed to the decoded or decompressed size of the
        resource).
        <br />
        It is zero if the data was obtained from local cache or a CORS request.
        The size of requests is not tracked. If you are looking for an overview
        of how this can be used, check out{' '}
        <Link
          href={
            'https://fershad.com/writing/including-user-interaction-in-website-carbon-estimates/'
          }
        >
          this blog
        </Link>
        .
        <br />
        {text.name} collects this transfer sizes for all requests from a browser
        tab and attributes them to the domain of the page that is loaded in the
        tab. The data is stored in the local browser storage. You can delete it
        by pressing the "Reset" button of {text.name} in the top bar.
        <br />
        The comparisons of the estimated CO<sub>2</sub>e emissions are done with
        functions from the grasp package. For further information on its data
        check out{' '}
        <Link href={'https://github.com/hoernschen/grasp/wiki'}>this page</Link>
        .
      </Typography>
    </Paper>
  );
}
