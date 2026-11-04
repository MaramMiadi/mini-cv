Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2204"
  config.vm.hostname = "devsecops-portfolio"

  # Partager le dossier du projet avec la VM
  config.vm.synced_folder ".", "/vagrant",
    type: "rsync",
    rsync__exclude: [".git/", "node_modules/", ".next/"]

  config.vm.network "private_network", ip: "192.168.56.10"

  config.vm.provider "libvirt" do |libvirt|
    libvirt.memory = 4096
    libvirt.cpus = 2
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbooks/site.yml"
    ansible.limit = "all"
    ansible.become = true
  end
end
