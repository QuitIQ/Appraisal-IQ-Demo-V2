import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

export interface BudgetProps {
  header?: string,
  subtext?: string,
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
  icon: string
}

export function Budget({ header, subtext, diff, trend, sx, value, icon }: BudgetProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {header ? header : "Budget"}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: icon === "dollar" ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
              {icon === "dollar"
              ?
                <CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />
              :
                <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
              }
            </Avatar>
          </Stack>
          {diff ? (
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                {subtext ? subtext : "Since last month"}
              </Typography>
            </Stack>
          ) 
          : 
          <Typography color="text.secondary" variant="caption">
            {subtext ? subtext : "Since last month"}
          </Typography>
          }
        </Stack>
      </CardContent>
    </Card>
  );
}
