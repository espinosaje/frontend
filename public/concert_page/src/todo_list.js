class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // we can call the web service here, NOT working yet
  //componentDidMount() {
	  callService() {
		//var band = $('#band-in').val();
		console.log('calling service...');
		/* $.ajax({
			statusCode: {
			  500: function() {		
				$('.band-div').append('<li>Band NOT Found </li>');
			   }
			},	
			url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/artist",		
			data: { 
				artistName: 'nine inch nails'
			}
		}).then(function(data) {
			if (data != null){
				//$('.band-div').append('<li>Band Found:'+data.name+', id:'+data.mbid+' </li>');
				//artist_data = data;	//not sure if we need this, it would just be for artist ID
				this.setState({items: data});
			}
		  
		}); */
		$.ajax({
			  url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",
			  data: { 
				name: 'red rocks',
				cityName: 'Morrison',
				stateCode: 'CO',
				lookForLocalDatabaseFirst: true
				},
			  dataType: 'json',
			  cache: false,
			  success: function(data) {
				this.setState({items: data}); //this is not an array, so it's breaking
				
				/* const newItem = {
				  text: this.state.text,
				  id: Date.now()
				};
				this.setState(prevState => ({
				  items: prevState.items.concat(newItem),
				  text: ''
				})); */
				
			  }.bind(this),
			  error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			  }.bind(this)
		});
	}
   

  render() {
	  console.log('items: '+this.state.items[0]);
    return (
      <div>
        <h3>Can Add List of bands</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            Add Artists to Lineup
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
	this.callService();

	
    /* if (!this.state.text.length) {
      return;
    }
	
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));  */
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
        //  <li key={item.id}>{item.text}</li>
		<li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }
}

const domContainer = document.querySelector('#venue_list');
ReactDOM.render(<TodoApp />, domContainer);

//const domContainer = document.querySelector('#venue_list');
//ReactDOM.render(e(LikeButton), domContainer);