import React from 'react';
import './App.css';
import TemperatureGraph from './components/TemperatureChart';
import Temperature from './components/Temperature';
import { useCubeQuery } from '@cubejs-client/react';

const chart = ({ query, cubejsApi }) => {
  const {
    resultSet,
    error,
    isLoading
  } = useCubeQuery(query, { subscribe: true, cubejsApi });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <pre>{error.toString()}</pre>;
  }

  if (!resultSet) {
    return null;
  }

  return resultSet;
};

function App() {

  const datita = [
    {
      "id": "japan",
      "color": "hsl(47, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 281
        },
        {
          "x": "helicopter",
          "y": 52
        },
        {
          "x": "boat",
          "y": 40
        },
        {
          "x": "train",
          "y": 211
        },
        {
          "x": "subway",
          "y": 199
        },
        {
          "x": "bus",
          "y": 261
        },
        {
          "x": "car",
          "y": 280
        },
        {
          "x": "moto",
          "y": 142
        },
        {
          "x": "bicycle",
          "y": 67
        },
        {
          "x": "horse",
          "y": 255
        },
        {
          "x": "skateboard",
          "y": 248
        },
        {
          "x": "others",
          "y": 285
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(202, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 166
        },
        {
          "x": "helicopter",
          "y": 180
        },
        {
          "x": "boat",
          "y": 42
        },
        {
          "x": "train",
          "y": 177
        },
        {
          "x": "subway",
          "y": 199
        },
        {
          "x": "bus",
          "y": 136
        },
        {
          "x": "car",
          "y": 270
        },
        {
          "x": "moto",
          "y": 292
        },
        {
          "x": "bicycle",
          "y": 145
        },
        {
          "x": "horse",
          "y": 102
        },
        {
          "x": "skateboard",
          "y": 10
        },
        {
          "x": "others",
          "y": 246
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(130, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 253
        },
        {
          "x": "helicopter",
          "y": 116
        },
        {
          "x": "boat",
          "y": 51
        },
        {
          "x": "train",
          "y": 29
        },
        {
          "x": "subway",
          "y": 12
        },
        {
          "x": "bus",
          "y": 38
        },
        {
          "x": "car",
          "y": 285
        },
        {
          "x": "moto",
          "y": 294
        },
        {
          "x": "bicycle",
          "y": 32
        },
        {
          "x": "horse",
          "y": 38
        },
        {
          "x": "skateboard",
          "y": 42
        },
        {
          "x": "others",
          "y": 276
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(183, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 289
        },
        {
          "x": "helicopter",
          "y": 248
        },
        {
          "x": "boat",
          "y": 10
        },
        {
          "x": "train",
          "y": 214
        },
        {
          "x": "subway",
          "y": 20
        },
        {
          "x": "bus",
          "y": 126
        },
        {
          "x": "car",
          "y": 55
        },
        {
          "x": "moto",
          "y": 296
        },
        {
          "x": "bicycle",
          "y": 224
        },
        {
          "x": "horse",
          "y": 63
        },
        {
          "x": "skateboard",
          "y": 99
        },
        {
          "x": "others",
          "y": 133
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(332, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 292
        },
        {
          "x": "helicopter",
          "y": 285
        },
        {
          "x": "boat",
          "y": 191
        },
        {
          "x": "train",
          "y": 115
        },
        {
          "x": "subway",
          "y": 38
        },
        {
          "x": "bus",
          "y": 268
        },
        {
          "x": "car",
          "y": 283
        },
        {
          "x": "moto",
          "y": 146
        },
        {
          "x": "bicycle",
          "y": 222
        },
        {
          "x": "horse",
          "y": 23
        },
        {
          "x": "skateboard",
          "y": 122
        },
        {
          "x": "others",
          "y": 75
        }
      ]
    }
  ]




  return (
    <div className="App">
      <div className="App-header">
        <h1>Arduindoor</h1>
      </div>
      <div className="data-container">
        <div className="data-card">
          <Temperature />
        </div>
      </div>
      <div className="chart">
        <TemperatureGraph data={datita} />
      </div>
		</div>
  );
}

export default App