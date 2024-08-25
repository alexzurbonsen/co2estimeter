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
        How are CO<sub>2</sub>e emissions for browsing activity calculated?
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        {text.name} uses the{' '}
        <Link
          href={
            'https://sustainablewebdesign.org/estimating-digital-emissions/'
          }
        >
          <strong>Sustainable Webdesign Model v4</strong>
        </Link>{' '}
        (SWD) to calculate the CO<sub>2</sub>e value of green house gas
        emissions associated with browsing activity. For the actual caluclation{' '}
        the{' '}
        <Link href="https://developers.thegreenwebfoundation.org/co2js/overview/">
          co2.js library
        </Link>{' '}
        from the{' '}
        <Link href="https://www.thegreenwebfoundation.org/">
          Green Web Foundation
        </Link>{' '}
        is used.
        <br />
        How does the SWD model work? This following section provides a short
        summary. The full picture can be found{' '}
        <Link
          href={
            'https://sustainablewebdesign.org/estimating-digital-emissions/'
          }
        >
          here
        </Link>{' '}
        .
        <br />
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
        emissions estimate in CO
        <sub>2</sub>e. The grid carbon intensity is the amount of CO<sub>2</sub>
        e emitted per kWh of electricity produced.
        <br />
        If you want to know more about the modelling choices, there is also this
        <Link
          href={
            'https://www.wholegraindigital.com/blog/website-energy-consumption/'
          }
        >
          intersting article about the variance in estimates of CO<sub>2</sub>e
          emissions for internet activity
        </Link>{' '}
        <br />
        The SWD model comes with a couple of knobs. You can use different grid
        intensities for the different segments. You can also play around with an
        estimated green hosting percentage. In the context of the {text.name},
        this is the percentage of data centers running on renewable or
        zero-carbon energy.
        <br />
        Of course, the approach has limitations. It does not take into account
        the energy consumption of the server that processes your request for
        example. Taken to an extreme, if your request causes a server work to do
        some heavy work for a whole day but it only sends back a short message
        once it is finished, the estimated energy consumption of your request
        would just reflect the length of the short message, not the work the
        server has done. Also the distance that the requested data has covered
        on the way to your device does not have an effect on the estimates.
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        How does {text.name} collect the necessary data and store it?
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        This extension leverages the Performance API that is available in
        browsers. It can continuously observe network requests and provide
        performance data about them. This also includes the so called{' '}
        <Link
          href={
            'https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/transferSize'
          }
        >
          transfer size
        </Link>
        . That is the size of the response as it is sent over the network to
        your device (as opposed to the decoded or decompressed size of the
        resource).
        <br />
        It is zero if the data was obtained from local cache or a CORS request.
        The size of requests is not tracked. If you are looking for an overview
        of how the Performance API can be used, check out{' '}
        <Link
          href={
            'https://fershad.com/writing/including-user-interaction-in-website-carbon-estimates/'
          }
        >
          this blog or Mozilla's docs{' '}
          <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Performance"></Link>
        </Link>
        .
        <br />
        {text.name} collects this transfer sizes for all requests from a browser
        tab and attributes them to the domain of the page that is loaded in the
        tab. The data is stored in the local browser storage. You can delete it
        by pressing the "Reset" button of {text.name} in the top bar.
        <br />
        The comparisons of the estimated CO<sub>2</sub>e emissions are done with
        functions from the{' '}
        <Link href={'https://github.com/hoernschen/grasp'}>grasp</Link> package.
        For further information on its data check out its{' '}
        <Link href={'https://github.com/hoernschen/grasp/wiki'}>wiki page</Link>
        .
      </Typography>
    </Paper>
  );
}
