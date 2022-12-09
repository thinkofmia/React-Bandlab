//List: Displays list of posts
class List extends React.Component {
  constructor() {
    super();
    this.state = { data: [] , original: [], sort: 'none'};
  }

  async dataMount() {
    await fetch('https://jsonplaceholder.typicode.com/posts/')
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json, original: json , sort: 'id'});
        console.log(json);
      });
  } 

  sortPosts(method='id'){
    switch (method){
      case 'title':
        this.setState({data: this.state.original.sort(function(first, second) {
          return first.title.localeCompare(second.title);
         }), original: this.state.original, sort: 'title'
         })
        break;
      case 'id':
      default:
        this.setState({data: this.state.original.sort(function(first, second) {
          return first.id - second.id;
         }), original: this.state.original,  sort: 'id' })
        break;
    }
  }

  groupPosts(){
    let groupBy = (array, key) => {
      return array.reduce((result, obj) => {
         (result[obj[key]] = result[obj[key]] || []).push(obj);
         return result;
      }, {});
   };
   let grouped = groupBy(this.state.original, "userId");
   this.setState({data: grouped, original: this.state.original,  sort: 'group' })
  }

  render() {
    var cardImage = 'React-Bandlab-Test/img/sample-image.gif';
    return (
      <div>
        <button class="fetch-btn post-btns" onClick = { () => this.dataMount() }>Fetch List</button>
        {(this.state.data.length||this.state.sort=='group') && this.state.sort != 'none' ? <button class={this.state.sort == 'id'?"sort-btn post-btns selected":"sort-btn post-btns"} onClick = { () => this.sortPosts('id') }>Sort by ID</button> :''}
        {(this.state.data.length||this.state.sort=='group') && this.state.sort != 'none' ? <button class={this.state.sort == 'title'?"sort-btn post-btns selected":"sort-btn post-btns"} onClick = { () => this.sortPosts('title') }>Sort by Title</button> :''}
        {(this.state.data.length||this.state.sort=='group') && this.state.sort != 'none' ? <button class={this.state.sort == 'group'?"sort-btn post-btns selected":"sort-btn post-btns"} onClick = { () => this.groupPosts() }>Group by User</button> :''}
        {this.state.sort == 'group'?(
        <ul class='cards'>
          {Object.entries(this.state.data).map(([grp,contents]) => (
            <div class="card-group">
            <h1 class="card-group-id">User Id: {grp}</h1>
              {contents.map(el => (
              <li class="card">
                <img class="card-image" src={cardImage} alt="Blushy Leoz" />
                <div class="card-contents">
                  <h2 class="card-title">{el.title}</h2>
                  <p class="card-description">{el.body}</p>
                  <p class="card-user">{el.userId}</p>
                </div>
              </li>
              ))}
            </div>
            ))
            }
          </ul>
          ):(
          <ul class='cards'>
            {this.state.data.map(el => (
              <li class="card">
                <img class="card-image" src={cardImage} alt="Blushy Leoz" />
                <div class="card-contents">
                  <h2 class="card-title">{el.title}</h2>
                  <p class="card-description">{el.body}</p>
                  <p class="card-user">{el.userId}</p>
                </div>
              </li>
            ))}
          </ul>
          )
        }
      </div>
    );
  }
  
}
