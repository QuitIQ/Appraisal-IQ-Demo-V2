import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { Sales } from '@/components/dashboard/overview/sales';
import { SimilarProperty } from '@/components/dashboard/overview/similarProperty';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <div>
      <div style={{paddingBottom: "15px"}}>
        <Typography variant="h4">714 Steiner St</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12}>
          <Budget header="Estimated Value" subtext="Since last sale" diff={25} trend="up" sx={{ height: '100%' }} value="$1.5M" icon="dollar" />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <Budget header="Previous Sale" subtext="November 2022" trend="down" sx={{ height: '100%' }} value="$1.2M" icon="receipt" />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TasksProgress sx={{ height: '100%' }} value="5 / 3.5" />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TotalProfit sx={{ height: '100%' }} value="10200" />
        </Grid>
        <Grid lg={12} xs={12}>
          <Sales
            chartSeries={[
              { name: 'This year', data: [1800, 1600, 1300, 1000, 1200, 1400, 1400, 1600, 1700, 1900, 1800, 2000] }
            ]}
            sx={{ height: '100%' }}
          />
        </Grid>
        <Grid>
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h5" sx={{ paddingBottom: '20px' }}>Similar Properties</Typography>
            <Grid container spacing={3}>
              <Grid lg={4}>
                <SimilarProperty 
                  sx={{ height: '100%' }}
                  imageFile="mansion1.jpeg"
                  title="123 Elm St"
                  price={18000000}
                  bedrooms={5}
                  bathrooms={3.5}
                  age={2}
                  sqft={10500}
                />
              </Grid>
              <Grid lg={4}>
                <SimilarProperty 
                  sx={{ height: '100%' }}
                  imageFile="mansion2.jpeg"
                  title="562 King St"
                  price={17500000}
                  bedrooms={6}
                  bathrooms={3}
                  age={6}
                  sqft={9000}
                />
              </Grid>
              <Grid lg={4}>
                <SimilarProperty 
                  sx={{ height: '100%' }}
                  imageFile="mansion3.jpeg"
                  title="444 Villa St"
                  price={20000000}
                  bedrooms={6}
                  bathrooms={6}
                  age={8}
                  sqft={11000}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
