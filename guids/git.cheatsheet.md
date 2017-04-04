# git cheatsheet

## 브런치 만들어서 브런치에 체크아웃
> git checkout -b branchName

### 위는 아래를 풀어 쓴것
> git branch branchName<br />
git checkout branchName

## 현재 브런치와 기존 브런치 머지
> git merge mergeBranchName

머지할 브런치를 현재브런치와 합쳐준다

## remote push
> git push -u origin branchName

## remote fetch
> git fetch branchName

## clone branch
git clone -b branchName githubUrl createProjectDirectoryName
