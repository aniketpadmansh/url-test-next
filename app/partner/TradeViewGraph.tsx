"use client";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import styles from "./partner.module.scss";

const NEGATIVE = "NEGATIVE";

const graphColorConfig = {
  POSITIVE: "#41B68B",
  NEGATIVE: "#DD4C4C",
};

const TradeViewGraph = ({ stockMeta }) => {
  const { market_price_change, last_traded_price, trade_ticks } =
    stockMeta || {};
  const { value, percentage, type } = market_price_change || {};

  return (
    <div className={styles.relative}>
      <div>
        <p className={`${styles.text16} ${styles.textWhite}`}>
          ₹{last_traded_price}
        </p>

        <div
          className={`${
            type === NEGATIVE ? styles.textRed : styles.textGreen
          } ${styles.text12} -mt-1`}
        >
          {type === NEGATIVE ? "-" : "+"}
          {Math.abs(value)} ({Math.abs(percentage)}%)
        </div>
      </div>

      <div className={styles.graphContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trade_ticks}
            margin={{
              top: 5,
              right: 0,
              left: 0,
            }}
          >
            <defs>
              <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="15%"
                  stopColor={graphColorConfig?.[type]}
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="#2A2D39
"
                  stopOpacity={0.95}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke="transparent"
              fill="url(#colorGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradeViewGraph;
