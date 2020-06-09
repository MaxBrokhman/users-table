export const stylesByType = {
  add: `
    :host {
      align-self: center;
    }
    #btn {
      margin-left: 50px;
      height: 40px;
      color: #fff;
      background-color: #353535;
      font-size: 0.8rem;
      width: 115px;
    }
    #btn:hover {
      background-color: #28a745;
    }
  `,
  confirm: `
    :host {
      position: absolute;
      right: 0.25rem;
      top: 50%;
      transform: translateY(-50%);
    }
    #btn:hover {
      background-color: #28a745;
      border-color: #28a745;
    }
  `,
  newUser: `
    #btn {
      padding: 10px 25px;
      color: #fff;
      background-color: #353535;
      font-size: 0.8rem;
    }
    #btn:hover {
      background-color: #28a745;
    }
  `,
  close: `
    :host {
      position: absolute;
      top: 10%;
      right: 10%;
      width: 33px;
      height: 33px;
    }
    #btn {
      position: absolute;
      top: 10%;
      right: 10%;
      border-radius: 30px;
      line-height: 1.4rem;
      color: #dc3545;
      border-color: #dc3545;
    }
    #btn:hover {
      background-color: #dc3545;
    }
  `,
  regular: `
    #btn {
      border-color: #343a40;
    }
    #btn:hover {
      background-color: #343a40;
    }
  `,
  delete: `
    :host {
      position: absolute;
      width: 40px;
      height: 40px;
    }
    #btn {      
      border-radius: 30px;
      color: #dc3545;
      border-color: #dc3545;
      transform: translate(30%, 75%);
      font-weight: bold;
      padding: 0.26px;
      width: 20px;
      height: 20px;
    }
    #btn:hover {
      background-color: #dc3545;
    }
  `,
  asc: `
    :host {
      position: absolute;
      display: inline-block;
      width: 20px;
      height: 20px;
      right: 30px;
    }
    #btn {
      width: 20px;
      height: 20px;
      background-position: 50% 40%;
      background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.005 15.4C16.785 15.4 16.5849 15.32 16.4249 15.16L12.005 10.56L7.58496 15.16C7.28496 15.48 6.76494 15.48 6.44494 15.18C6.12494 14.88 6.12495 14.36 6.42495 14.04L11.4249 8.83998C11.5849 8.67998 11.785 8.59998 12.005 8.59998C12.225 8.59998 12.425 8.67998 12.585 8.83998L17.585 14.04C17.885 14.36 17.885 14.86 17.565 15.18C17.405 15.32 17.205 15.4 17.005 15.4Z" fill="black"/></svg>');
    }
    #btn:hover, #btn.active {
      background-color: #343a40;
      color: white;
      background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.005 15.4C16.785 15.4 16.5849 15.32 16.4249 15.16L12.005 10.56L7.58496 15.16C7.28496 15.48 6.76494 15.48 6.44494 15.18C6.12494 14.88 6.12495 14.36 6.42495 14.04L11.4249 8.83998C11.5849 8.67998 11.785 8.59998 12.005 8.59998C12.225 8.59998 12.425 8.67998 12.585 8.83998L17.585 14.04C17.885 14.36 17.885 14.86 17.565 15.18C17.405 15.32 17.205 15.4 17.005 15.4Z" fill="white"/></svg>');
    }
  `,
  desc: `
    :host {
      position: absolute;
      display: inline-block;
      width: 20px;
      height: 20px;
      right: 8px;
    }
    #btn {
      width: 20px;
      height: 20px;
      background-position: 50% 40%;
      background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.005 15.4C11.785 15.4 11.5849 15.32 11.4249 15.16L6.42495 9.95997C6.12495 9.63997 6.12494 9.13997 6.44494 8.81997C6.76494 8.51997 7.26496 8.51998 7.58496 8.83998L12.005 13.44L16.425 8.83998C16.725 8.51998 17.245 8.51997 17.565 8.81997C17.885 9.11997 17.8849 9.63997 17.5849 9.95997L12.585 15.16C12.425 15.32 12.225 15.4 12.005 15.4Z" fill="black"/></svg>');
    }
    #btn:hover, #btn.active {
      background-color: #343a40;
      color: white;
      background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.005 15.4C11.785 15.4 11.5849 15.32 11.4249 15.16L6.42495 9.95997C6.12495 9.63997 6.12494 9.13997 6.44494 8.81997C6.76494 8.51997 7.26496 8.51998 7.58496 8.83998L12.005 13.44L16.425 8.83998C16.725 8.51998 17.245 8.51997 17.565 8.81997C17.885 9.11997 17.8849 9.63997 17.5849 9.95997L12.585 15.16C12.425 15.32 12.225 15.4 12.005 15.4Z" fill="white"/></svg>');
    }
  `,
}
