
Vagrant.configure("2") do |config|

  config.vm.box = "generic/ubuntu2204"

  # Nom de la VM
  config.vm.define "minicv-vm"
  config.vm.hostname = "minicv-vm"

  # Adresse IP privee
  config.vm.network "private_network",
    ip: "192.168.56.10"

  # Ressources de la VM avec Libvirt
  config.vm.provider :libvirt do |libvirt|
    libvirt.memory = 2048
    libvirt.cpus = 2
    libvirt.title = "Mini CV VM"
  end

end


