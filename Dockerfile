FROM registry.gitlab.com/teallabs-frontend/dashboard-host
WORKDIR /src
ADD  dist/ public/
