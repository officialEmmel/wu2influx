const Influx = require("influx");

export class Database {
  private influx: any;
  constructor(host: any, database: any) {
    this.influx = new Influx.InfluxDB({
      host: host,
      database: database,
      schema: [
        {
          measurement: "temp",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "heatIndex",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "dewpt",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "windChill",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "windSpeed",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "windGust",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "pressure",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "precipRate",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "precipTotal",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "elev",
          fields: {
            value: Influx.FieldType.FLOAT,
          },
          tags: [],
        },
        {
          measurement: "obsTimeUtc",
          fields: {
            value: Influx.FieldType.STRING,
          },
          tags: [],
        },
        {
          measurement: "obsTimeLocal",
          fields: {
            value: Influx.FieldType.STRING,
          },
          tags: [],
        },
        {
          measurement: "winddir",
          fields: {
            value: Influx.FieldType.INTEGER,
          },
          tags: [],
        },
        {
          measurement: "humidity",
          fields: {
            value: Influx.FieldType.INTEGER,
          },
          tags: [],
        },
      ],
    });
  }

  public async writeData(payload: any) {
    this.influx.writePoints([
      {
        measurement: "temp",
        fields: { value: payload.temp },
      },
      {
        measurement: "heat_index",
        fields: { value: payload.heatIndex },
      },
      {
        measurement: "dewpt",
        fields: { value: payload.dewpt },
      },
      {
        measurement: "wind_chill",
        fields: { value: payload.windChill },
      },
      {
        measurement: "wind_speed",
        fields: { value: payload.windSpeed },
      },
      {
        measurement: "wind_gust",
        fields: { value: payload.windGust },
      },
      {
        measurement: "pressure",
        fields: { value: payload.pressure },
      },
      {
        measurement: "precip_rate",
        fields: { value: payload.precipRate },
      },
      {
        measurement: "precip_total",
        fields: { value: payload.precipTotal },
      },
      {
        measurement: "elev",
        fields: { value: payload.elev },
      },
      {
        measurement: "obs_time_utc",
        fields: { value: payload.obsTimeUtc },
      },
      {
        measurement: "obs_time_local",
        fields: { value: payload.obsTimeLocal },
      },
      {
        measurement: "winddir",
        fields: { value: payload.winddir },
      },
      {
        measurement: "humidity",
        fields: { value: payload.humidity },
      },
    ]);
  }
}
