
import { Card, Skeleton } from 'antd'
import {totalCountVariants} from '@/constants'
import {Text} from '../text'
import { AreaConfig, Area } from '@ant-design/plots';
type Props = {  
  resource: "companies"|"contacts"|"deals",
  isLoading:boolean,
  totalCount?:number
}
const DashboardTotalCountCard = ({resource, isLoading,totalCount}:Props) => {
  const {primaryColor,secondaryColor,icon,title,data} = totalCountVariants[resource]

  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: 'index',
    yField: 'value',
    appendPadding: [1, 0, 0, 0], // Adjust the padding values as needed
    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          stroke: "transparent"
        }
      },
      grid: {
        line: {
          style: {
            stroke: "transparent"
          }
        }
      }
    },
    smooth: true,
    line: {
      color: primaryColor,
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2 ${secondaryColor} 1:${primaryColor}`
      }
    }
  };
   //console.log("config",config)
  
   return (
    <Card
      style={{ height: "100px", padding: 0 ,overflow: "hidden"}}
      bodyStyle={{
        padding: "8px 8px 8px 12px",
      }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          whiteSpace: "nowrap",
          
        }}
      >
        {icon}
        <Text size="md" className="secondary" style={{ marginLeft: "8px" }}>
          {title}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
            
        }}
      >
        <Text
          size="xxxl"
          strong
          style={{
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
            width:"20%"
          }}
        >
          {isLoading ? (
            <Skeleton.Button
              style={{
                marginTop: "8px",
                width: "74px",
              }}
            />
          ) : (
            totalCount
          )}
        </Text>
      
          <Area style={{ maxHeight: "100%" ,width:"60%"}}{...config} />
       
      </div>
    </Card>
  );
};



export default DashboardTotalCountCard