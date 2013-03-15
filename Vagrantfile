Vagrant::Config.run do |config|
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.host_name = "gt"

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = "my-recipes/cookbooks"
    chef.add_recipe("vagrant_main")
    chef.json.merge!({
    :mysql => {
      :server_root_password => "root",
      :server_debian_password => "root",
      :server_repl_password => "root"
    }
  })
  end

  config.vm.forward_port(80, 8080)
  config.vm.forward_port(3306, 3306)
  
  config.vm.share_folder("v-root", "/vagrant", ".", :extra => 'dmode=777,fmode=777')
end
