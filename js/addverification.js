document.getElementById('openVerification').addEventListener('click',()=>{
    const verify=document.getElementById('hidden-id').dataset.verify;
    
    const veifyPanel = document.getElementById('verifypanel');
    veifyPanel.innerHTML = `<a href="javascript:void(0)" class="closebtn" onclick="closeverify()"><i class="fi fi-sr-circle-xmark"
        style="font-size: 20px;text-decoration: none;color: black;"></i></a>`;
    if(verify==="yes"){
      veifyPanel.innerHTML += `<div class="verification-container">
  <div class="verified-badge">
    <span class="verified verify-badge"><i class="fi fi-rr-globe"></i></span>
  </div>
  <div class="text-verified">
  <h1 >Verified Account</h1>
  <h3>Your account is already verified!</h3>
  </div>
  <div class="verified-acc-brief">
    <p>Your account has been successfully verified and no need to verify again</p><br>
    <hr><br><br>
    <p style="font-size: 12px;">Other users can follow verified accounts only<br><br>
      Verified users can see the <b>follower</b> count<br><br>
      Verified users will be qualified for the upcomming programs in Quartex


    </p>
  </div>`
    }else{
        veifyPanel.innerHTML += `<h1>Get Trova Verified</h1>

    <div class="verified-badge">
      <span class="verified verify-badge"><i class="fi fi-rr-globe"></i></span>
    </div>
    <p class="verified-des">To get Trova Verified, You have to follow our criteria, You need another social media
      platform such as youtube,twiter or somthing else to prove you are a travel instructor,traveller or interest in
      travel.<br><br>
      And after requesting a verified badge, We check your profile also to prove if you are qualified!
    </p>
    <div class="verify-inputs">
      <form id="request-verify-form">
        <div class="input-container">

          <i class="fi fi-brands-youtube" style="font-size: 25px;"></i><input type="text" name="" id="ytlink"
            placeholder="Enter Youtube channel link" class="link-texts" >
        </div>
        <div class="input-container">

          <i class="fi fi-brands-linkedin" style="font-size: 25px;"></i><input type="text" name="" id="linked"
            placeholder="Enter LinkedIn Account link" class="link-texts" >
        </div>
        <div class="input-container">

          <i class="fi fi-brands-twitter" style="font-size: 25px;"></i><input type="text" name="" id="twitter"
            placeholder="Enter Twitter link" class="link-texts" >
        </div>
        <div class="input-container">

          <i class="fi fi-sr-interrogation" style="font-size: 25px;"></i><textarea type="text" name="" id="about-why"
            placeholder="Why We verify you" class="link-texts" required></textarea>
        </div>


        <input type="submit" value="Request Verification" class="Verify-btn">
      </form>
    </div>`

    document.getElementById('request-verify-form').addEventListener('submit',async(e)=>{
        e.preventDefault();
        const ytlink = document.getElementById('ytlink').value;
        const linkedin = document.getElementById('linked').value;
        const twitter = document.getElementById('twitter').value;
        const desc = document.getElementById('about-why').value;

        const postResponse = await fetch(
            "http://localhost:8000/api/users/reqverify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Ensure you're sending JSON
              },
              credentials: "include",
              body: JSON.stringify({
                desc:desc,
                yt:ytlink,
                fb:linkedin,
                tw:twitter
              }),
            }
          );
          if (postResponse.ok) {
            veifyPanel.innerHTML = `<a href="javascript:void(0)" class="closebtn" onclick="closeverify()"><i class="fi fi-sr-circle-xmark"
                style="font-size: 20px;text-decoration: none;color: black;"></i></a>`;
            verify.innerHTML =`Your verification request Added`;
          } else {
            console.error(
              "Error while posting data to addPost:",
              postResponse.statusText
            );
          } 
    })
    }

})