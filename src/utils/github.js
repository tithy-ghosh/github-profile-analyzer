import axios from "axios";
 const api = axios.create({
    baseURL: "https://api.github.com",
    headers:{
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
    },
 });

 export const getUser = (username) =>
     api.get(`/users/${username}`);
 
 export const getRepos = (username) =>
    api.get(`/users/${username}/repos?per_page=100&sort=pushed`);
 export const getEvents = (username) =>
  api.get(`/users/${username}/events/public?per_page=100`);
 
