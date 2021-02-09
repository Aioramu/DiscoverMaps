class All extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("/usercase/api/item/")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result.data)
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },

        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          //console.log(this.state.items);
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
render() {
  const { error, isLoaded, items } = this.state;
  //console.log('wtf',this.state.items)

  var coord=items
  if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      console.log(coord['features'])
  return(


  <div class="map">
  <div id="entry">
    <center>
    <a href="http://127.0.0.1:8000/usercase/login/">Войти </a>
    <a href="http://127.0.0.1:8000/usercase/registration">Зарегестрироваться</a>
    </center>
  </div>
  <YMaps >
  {console.log(coord)}
  <Map
    defaultState={{
      center: [55.751574, 37.573856],
      zoom: 10,
    }}
    width={1500} height={800}>
    <ObjectManager
      options={{
        clusterDisableClickZoom: true,
        clusterize: true,
        gridSize: 32,

      }}
      objects={{
        clusterDisableClickZoom: true,
        openBalloonOnClick: true,
        preset: 'islands#greenDotIcon',
      }}
      clusters={{
        clusterDisableClickZoom: true,
        preset: 'islands#redClusterIcons',
      }}
      filter={object => object.id % 2 === 0}

      //defaultFeatures={this.state.items}

      defaultFeatures={coord['features']}
      modules={[
        'objectManager.addon.clustersBalloon',
        'objectManager.addon.clustersHint',
        'objectManager.addon.objectsBalloon',
        'objectManager.addon.objectsHint',
      ]}
    />
  </Map>
</YMaps>
</div>
);
}
}
}
export default All;
