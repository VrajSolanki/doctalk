The project searches for the user name defined in the search bar, and displays the results in desc order based on the scores of the users, wrt to the number of followers.


To run the project  
use node version 7.5.0, (nvm use 7.5.0)


npm install  
npm run dev

To access the directory path:    
-- http://localhost:3001/test   
  
Project structure  

-- the project is set up with webpack and with production deployment scripts  
  
src  
- index.html(has root node)  
- styles (common styles and font patterns)  
- services (if any helper methods)  
- store (injects redux)  
- layout ( mounts corelayout)
- utils (utility methods)  
- main.js(mounts the root node to react app.)  
- components  
-- common symantic based components
- routes  
 -- test    
 

 each route has  
 - components (representational components)
 - containers (containers, modules)
 - index (defines route path )  
 - routes (defines child routes, is optional)

 each component has  
 - .js (react component)
 - .scss (style classes)  
 - index.js (exposes component) 



