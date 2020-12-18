export default class Summation {
  constructor(options) 
  {
    const axios = require('axios').default;
    this.ax = axios.create({});
    /*baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}*/
    this.gateway_url = options.gateway_url;
    this.token = options.token;
    this.gateway_token = options.gateway_token;
    this.default_database = options.default_database;
    let self = this;

    this.chain = 
    {
        queue: [],
        query: function(sql, parameters, database_name)
        {
            this.queue.push({'method': 'query', 'sql': sql, 'parameters': parameters, 'database_name': database_name});
            return this;
        },
        create: function(table, parameters, database_name)
        {
            this.queue.push({'method': 'create', 'table': table, 'parameters': parameters, 'database_name': database_name});
            return this;
        },
        read: function(table, parameters, database_name)
        {
            this.queue.push({'method': 'read', 'table': table, 'parameters': parameters, 'database_name': database_name});
            return this;
        },
        update: function(table, parameters, database_name)
        {
            this.queue.push({'method': 'update', 'table': table, 'parameters': parameters, 'database_name': database_name});
            return this;
        },
        upsert: function(table, parameters, database_name)
        {
            this.queue.push({'method': 'upsert', 'table': table, 'parameters': parameters, 'database_name': database_name});
            return this;
        },

        get: function(url, parameters, headers)
        {
            this.queue.push({'method': 'GET', 'url': url, 'parameters': parameters, 'headers': headers});
            return this;
        },
        post: function(url, data, headers)
        {
            this.queue.push({'method': 'POST', 'url': url, 'data': data, 'headers': headers});
            return this;
        },
        patch: function(url, data, headers)
        {
            this.queue.push({'method': 'PATCH', 'url': url, 'data': data, 'headers': headers});
            return this;
        },
        put: function(url, data, headers)
        {
            this.queue.push({'method': 'PUT', 'url': url, 'data': data, 'headers': headers});
            return this;
        },
        delete: function(url, data, headers)
        {
            this.queue.push({'method': 'DELETE', 'url': url, 'data': data, 'headers': headers});
            return this;
        },
        async run()
        {
            try
            {
                const response = await self.ax.post(self.gateway_url + "/chain", {
                    token: self.token,
                    gateway_token: self.gateway_token,
                    default_database: self.default_database,
                    queue: this.queue
                });
                console.log(response);
                return response.data;
            }
            catch (error) 
            {
                console.error(error);
            }
        }
    }
  }

  /* DATABASE METHODS */
  
  async query(sql, parameters, database_name)
  {
      try
      {
          const response = await this.ax.post(this.gateway_url + "/database", {
              sql: sql,
              token: this.token,
              gateway_token: this.gateway_token,
              parameters: parameters,
              database_name: database_name ? database_name : this.default_database
              });
          console.log(response);
          return response.data;
      }
      catch (error) 
      {
          console.error(error);
      }
  }

  async create(table, parameters, database_name)
  {
      try
      {
          const response = await this.ax.post(this.gateway_url + "/database", {
              table: table,
              method: 'create',
              parameters: parameters,
              token: this.token,
              gateway_token: this.gateway_token,
              database_name: database_name ? database_name : this.default_database
              });
          console.log(response);
          return response.data;
      }
      catch (error) 
      {
          console.error(error);
      }
  }

  async read(table, parameters, database_name)
  {
      try
      {
          const response = await this.ax.post(this.gateway_url + "/database", {
              table: table,
              method: 'read',
              parameters: parameters,
              token: this.token,
              gateway_token: this.gateway_token,
              database_name: database_name ? database_name : this.default_database
              });
          console.log(response);
          return response.data;
      }
      catch (error) 
      {
          console.error(error);
      }
  }

  async update(table, parameters, database_name)
  {
      try
      {
          const response = await this.ax.post(this.gateway_url + "/database", {
              table: table,
              method: 'update',
              parameters: parameters,
              token: this.token,
              gateway_token: this.gateway_token,
              database_name: database_name ? database_name : this.default_database
              });
          console.log(response);
          return response.data;
      }
      catch (error) 
      {
          console.error(error);
      }
  }

  async upsert(table, parameters, database_name)
  {
      try
      {
          const response = await this.ax.post(this.gateway_url + "/database", {
              table: table,
              method: 'upsert',
              parameters: parameters,
              token: this.token,
              gateway_token: this.gateway_token,
              database_name: database_name ? database_name : this.default_database
              });
          console.log(response);
          return response.data;
      }
      catch (error) 
      {
          console.error(error);
      }
  }


  /* BOTH DATABASE & API METHODS */

  async delete(param_1, param_2, param_3)
  {
      try 
      {
          //could be either an API call or a database call
          //parse URL to see if it's a valid URL, or the name of a database class
          if(param_1.search(/https?\:\/\//i)==0)
          {
              //is an API request
              var url = param_1;
              var data = param_2;
              var headers = param_3;
              const response = await this.ax.post(this.gateway_url + "/api", {
                url: url,
                token: this.token,
                gateway_token: this.gateway_token,
                data: data,
                headers: headers,
                method: 'DELETE'
                });
            console.log(response);
            return response.data;
          }
          else
          {
              //is a database query
              var table = param_1;
              var parameters = param_2;
              var databsae_name = param_3;

              const response = await this.ax.post(this.gateway_url + "/database", {
                table: table,
                method: 'delete',
                parameters: parameters,
                token: this.token,
                gateway_token: this.gateway_token,
                database_name: database_name ? database_name : this.default_database
                });
            console.log(response);
            return response.data;
          }

          
      } 
      catch (error) 
      {
          console.error(error);
      }
  }

  /* API METHODS */
  
  async get(url, parameters, headers)
  {
      try 
      {
          const response = await this.ax.post(this.gateway_url + "/api", {
              url: url,
              token: this.token,
              gateway_token: this.gateway_token,
              parameters: parameters,
              headers: headers,
              method: 'GET'
              });
          console.log(response);
          return response.data;
      } 
      catch (error) 
      {
          console.error(error);
      }
  }
  
  async post(url, data, headers)
  {
      try 
      {
          const response = await this.ax.post(this.gateway_url + "/api", {
              url: url,
              token: this.token,
              gateway_token: this.gateway_token,
              data: data,
              headers: headers,
              method: 'POST'
              });
          console.log(response);
          return response.data;
      } 
      catch (error) 
      {
          console.error(error);
      }
  }
  
  async put(url, data, headers)
  {
      try 
      {
          const response = await this.ax.post(this.gateway_url + "/api", {
              url: url,
              token: this.token,
              gateway_token: this.gateway_token,
              data: data,
              method: 'PUT'
              });
          console.log(response);
          return response.data;
      } 
      catch (error) 
      {
          console.error(error);
      }
  }
  
  async patch(url, data, headers)
  {
      try 
      {
          const response = await this.ax.post(this.gateway_url + "/api", {
              url: url,
              token: this.token,
              gateway_token: this.gateway_token,
              data: data,
              method: 'PATCH'
              });
          console.log(response);
          return response.data;
      } 
      catch (error) 
      {
          console.error(error);
      }
  }
}